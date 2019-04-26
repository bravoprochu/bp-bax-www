import { Injectable } from '@angular/core';
import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IBaxModelMaszynyNoweFilterLine } from '../../interfaces/i-bax-model-maszyny-nowe-filter-line';
import { IBaxModelMaszynyNoweFilterGroup } from '../../interfaces/i-bax-model-maszyny-nowe-filter-group';
import { IBaxModelMaszynaNowa } from '../../interfaces/i-bax-model-maszyna-nowa';
import { IBaxModelMaszynyNoweFilterTypeEnum } from '../../enums/i-bax-model-maszyny-nowe-filter-type-enum';
import { BAX_MODEL_SPEC_LIST_DESCRIPTION } from '../../data/bax-model-spec-description';
import { BAX_MODEL_SPEC_LIST_GROUPS } from '../../data/bax-model-spec-groups';
import { Observable, of } from 'rxjs';
import { IBaxModelSpecGroup } from '../../interfaces/i-bax-model-spec-group';
import { IBaxModelSpecLine } from '../../interfaces/i-bax-model-spec-line';
import { map, debounceTime } from 'rxjs/operators';
import { IBaxModelFilter } from '../../interfaces/i-bax-model-filter';
import { MaszynyNoweServicesModule } from './maszyny-nowe-services.module';

@Injectable({
  providedIn: MaszynyNoweServicesModule
})
export class MaszynyNoweService {
  filterGroup$: FormGroup;
  filterNumberSelect$: FormControl = new FormControl();
  filterAvailable: IBaxModelMaszynyNoweFilterLine[] = [];
  filterGroupsAvailable: IBaxModelMaszynyNoweFilterGroup[] = [];
  isDataReady: boolean;
  isFilterLengthCount: boolean = true;
  isModelSpecCardInfo: FormControl = new FormControl(false);

  maszynyNoweList: IBaxModelMaszynaNowa[] = [];
  maszynyNoweListAvailable: IBaxModelMaszynaNowa[] = [];






  constructor(
    private fb: FormBuilder,
  ) {
    console.log('maszyny-nowe.service ctor init');
    
    this.filterGroup$ = this.getFilterForm$();
    this.initFilterSearchGroups();
    this.initCheckboxGroups();
    this.filterGroup$.markAsPristine();
    this.initObservables();

    // this.mnDataFactory.getList().subscribe(
    //   (_data: IBaxModelMaszynaNowa[]) => {
    //     console.log('dataFactory', _data);
    //     this.maszynyNoweListAvailable = _data;
    //     this.filterAvailable = this.getMaszynyNoweFilters();
    //     this.filterGroupsAvailable = this.getFilterNumberLineGroups();
    //     this.clearFilterGroup();
    //     this.isDataReady = true;
    //   },
    //   (err) => console.log('dataFactory error', err),
    //   () => console.log('dataFactory finish..')
    // )
  }

  initData(){
        this.filterAvailable = this.getMaszynyNoweFilters();
        this.filterGroupsAvailable = this.getFilterNumberLineGroups();
        this.clearFilterGroup();
        this.isDataReady = true;
  }

  private checkIfFilterLineFits(dest: IBaxModelMaszynaNowa, filterLines: IBaxModelMaszynyNoweFilterLine[]): boolean {
    let res: boolean = false;
    let counter = 1;

    // console.log('filterlines checkIf', filterLines);

    for (let i = 0; i < filterLines.length; i++) {
      const filter = filterLines[i];
      const prop = filter.name;

      if (filter.filterType == IBaxModelMaszynyNoweFilterTypeEnum.checkboxIf) {
        //
        // if there are multiple value checkboxFieldName for one checkbox 'name',
        // generate one filterLine with "name" combined '|' between them
        //
        let nameValuesArr: string[] = (<string>filter.name).split('|');
        const checkFieldNameValue = dest[filter.checkboxFieldName];
        res =
          checkFieldNameValue &&
            nameValuesArr.some(f => f == (<string>checkFieldNameValue.toLocaleLowerCase()))
            // ((<string>checkFieldNameValue).toLocaleLowerCase() == filter.name.toLocaleLowerCase())
            ? true : false;
        if (res) { continue; } else { break; }
      }


      if (filter.filterType == IBaxModelMaszynyNoweFilterTypeEnum.numberMoreLess) {
        const propValue = dest[prop];
        res = (propValue && propValue >= filter.minFilter && propValue <= filter.maxFilter) ? true : false;
        if (res) { continue; } else { break; }
      }

      if (filter.filterType == IBaxModelMaszynyNoweFilterTypeEnum.stringSearch && filter.searchPhrase) {
        const propValue = dest[prop];
        res = (propValue && <string>propValue).toLowerCase().includes(filter.searchPhrase.toLowerCase())
        if (res) { continue; } else { break; }
      }
    };

    return res;
  }

  clearFilterGroup() {
    this.filterNumberSelect$.reset(null, { emitEvent: false });
    this.filterNumberArr$.controls = [];
    (<FormControl>this.modelSearchGroup$.get('searchPhrase')).setValue("", { emitEvent: false });
    this.filterCheckboxArr$.controls = [];
    this.initCheckboxGroups();
    this.maszynyNoweList = [...this.maszynyNoweListAvailable];
    this.filterGroup$.markAsPristine();
  }


  filterLineConvertToGroup(filterList: IBaxModelMaszynyNoweFilterLine[]) {
    let controlsToRemove: number[] = [];
    let controlsToAdd: number[] = [];

    if (filterList == null || filterList.length == 0) {
      console.log('filter emtpy or null', this.filterNumberArr$.value, filterList);
      this.filterNumberArr$.controls = [];

      console.log('filterSelected$: ', this.filterNumberArr$.controls);
      return;
    }

    if (this.filterNumberArr$.controls.length == 0) {
      filterList.forEach(f => this.filterNumberArr$.push(this.getFilterLineFormGroup$(f)));
      return;
    };

    const _controls = this.filterNumberArr$.value;

    // remove filters
    for (let i = 0; i < _controls.length; i++) {
      const controlGroup: IBaxModelMaszynyNoweFilterLine = _controls[i];

      const filterAlreadyExists = filterList.find(f => f.name == controlGroup['name']);

      if (!filterAlreadyExists) {
        controlsToRemove.push(i);
      }
    }

    controlsToRemove.forEach(f => this.filterNumberArr$.removeAt(f));

    filterList.forEach(filter => {
      const foundOnControls = (<IBaxModelMaszynyNoweFilterLine[]>_controls).find(f => f.name == filter.name);
      if (!foundOnControls) { this.filterNumberArr$.push(this.getFilterLineFormGroup$(filter)) };
    });


  }


  filterUpdateSearchArray(rForm: FormGroup, modelFieldNames: string[], value: string) {
    const searchArr$: FormArray = <FormArray>rForm.get('search');
    console.log(value);


    if (searchArr$.length > 0) {
      //
      // updateSearch fields
      //
      if (!value) {
        return;
      }


    } else {
      if (!value) {
        return;
      }
      modelFieldNames.forEach(filed => {
        let searchFilterLine = <IBaxModelMaszynyNoweFilterLine>{
          filterType: IBaxModelMaszynyNoweFilterTypeEnum.stringSearch,
          name: filed,
          searchPhrase: value
        };
        let searchFilterLineGroup = this.getFilterLineFormGroup$(searchFilterLine);
      })
    }
  }


  getFilterSearchFieldName(): string {
    return 'searchPhrase';
  }

  getFilterForm$(): FormGroup {
    let rForm = this.fb.group({
      searchArr: this.fb.array([]),
      numberArr: this.fb.array([]),
      checkboxArr: this.fb.array([])
    });
    return rForm;
  }

  getFilterNumberLineGroups(): IBaxModelMaszynyNoweFilterGroup[] {
    this.filterGroupsAvailable = [];
    let res: IBaxModelMaszynyNoweFilterGroup[] = [];

    const _filters = this.getMaszynyNoweFilters();

    _filters.forEach(f => {
      const filterLine = <IBaxModelMaszynyNoweFilterLine>{
        filterType: f.filterType,
        label: f.label,
        max: f.max,
        maxFilter: f.maxFilter,
        min: f.min,
        minFilter: f.minFilter,
        name: f.name
      };

      let groupFound = res.find(g => g.groupName == f.groupName);
      if (groupFound) {
        groupFound.filters.push(filterLine);
      } else {
        const _newGroup = <IBaxModelMaszynyNoweFilterGroup>{
          groupName: f.groupName,
          filters: []
        };
        _newGroup.filters.push(filterLine);
        res.push(_newGroup);
      }
    });

    return res;
  }


  getMaszynyNoweFilters(): IBaxModelMaszynyNoweFilterLine[] {
    let res: IBaxModelMaszynyNoweFilterLine[] = [];

    const models = this.getModelList()
    const description = BAX_MODEL_SPEC_LIST_DESCRIPTION;
    const groups = BAX_MODEL_SPEC_LIST_GROUPS;

    models.forEach(model => {

      for (let prop in model) {
        const propValue = model[prop];
        if (!propValue) { continue; }
        if (typeof model[prop] === "number") {
          if (!propValue || !description[prop]) { break; }
          const foundInRes = res.find(f => f.name == prop);
          if (foundInRes == null) {
            const newFilterLine = <IBaxModelMaszynyNoweFilterLine>{
              filterType: IBaxModelMaszynyNoweFilterTypeEnum.numberMoreLess,
              groupName: groups[prop],
              label: description[prop],
              max: propValue,
              min: propValue,
              minFilter: propValue,
              maxFilter: propValue,
              name: prop,
            }
            res.push(newFilterLine);
          } else {
            foundInRes.max = foundInRes.max < propValue ? propValue : foundInRes.max;
            foundInRes.min = foundInRes.min > propValue ? propValue : foundInRes.min;
            foundInRes.minFilter = foundInRes.min;
            foundInRes.maxFilter = foundInRes.max;
          }

        }
      }
    });
    return res;

  }


  getModelById(id: string): Observable<IBaxModelMaszynaNowa> {
    const m = this.maszynyNoweListAvailable.find(f => f.id == id);
    return of(m);
  }

  getModelList(): IBaxModelMaszynaNowa[] {
    // const data = BAX_MASZYNY_NOWE;
    return this.maszynyNoweListAvailable;
  }

  getModelLineGroup(model: IBaxModelMaszynaNowa, searchPhrase: string): IBaxModelSpecGroup[] {
    let res: IBaxModelSpecGroup[] = [];
    for (let prop in model) {
      const line = this.getModelLineByProp(model, prop);
      if (line) {
        const groupFound = res.find(f => f.groupName == line.groupName);
        if (groupFound != null) {
          groupFound.specLines.push(line);
        } else {
          const newGroup = <IBaxModelSpecGroup>{
            groupName: line.groupName,
            specLines: []
          }
          newGroup.specLines.push(line);
          if (newGroup.groupName.trim().length > 0) {
            if (searchPhrase != null) {

              const ph = searchPhrase.toLocaleLowerCase();
              const g = line.groupName.toLocaleLowerCase();
              const l = line.label.toLocaleLowerCase();

              if (g.includes(ph) || l.includes(ph)) {
                res.push(newGroup);
              }
            } else {
              res.push(newGroup);
            }
          }
        }
      }
    }
    return res;
  }

  private getModelLineByProp(model: IBaxModelMaszynaNowa, propName: string): IBaxModelSpecLine {
    const descr = BAX_MODEL_SPEC_LIST_DESCRIPTION[propName];
    const value = model[propName];
    const group = BAX_MODEL_SPEC_LIST_GROUPS[propName];
    if (value != null && descr != null && group != null) {
      return <IBaxModelSpecLine>{
        groupName: group,
        label: descr,
        value: value
      }
    }
    return null;
  }



  private getFilterLineFormGroup$(filter?: IBaxModelMaszynyNoweFilterLine): FormGroup {
    return this.fb.group({
      checkboxValue: [filter.checkboxValue],
      checkboxFieldName: [filter.checkboxFieldName],
      filterType: [filter.filterType],
      groupName: [filter.groupName],
      label: [filter.label],
      min: [filter.min],
      max: [filter.max],
      minFilter: [filter.minFilter],
      maxFilter: [filter.maxFilter],
      name: [filter.name],
      searchPhrase: [filter.searchPhrase]
    });
  }

  initObservables() {
    this.filterNumberSelect$.valueChanges.pipe(
      map((_filterLines: IBaxModelMaszynyNoweFilterLine[]) => {
        this.filterLineConvertToGroup(_filterLines);
        return _filterLines
      }),
    ).subscribe(
      // (_data: any) => {
      // console.log('filterNumberSelect', _data);

      // },
      // (err) => console.log('filterNumberSelect error', err),
      // () => console.log('filterNumberSelect finish..')
    )



    this.filterGroup$.valueChanges.pipe(
      map((modelfilter: IBaxModelFilter) => {
        let checkboxArr: IBaxModelMaszynyNoweFilterLine[] = [];
        let searchArr = [];

        //
        // add only true values for checkbox
        // and searchPhrase has at least one letter
        //
        let tempGroupFieldNameArr = [];
        for (let checkFilter = 0; checkFilter < modelfilter.checkboxArr.length; checkFilter++) {
          const element = modelfilter.checkboxArr[checkFilter];
          if (!element.checkboxValue) { continue; }
          let foundShared = tempGroupFieldNameArr.find(f => f["id"] == element.checkboxFieldName && f["value"] == element.checkboxValue);
          if (foundShared) {
            foundShared["combinedFieldName"] += "|" + element.name;
          } else {
            const checkGroupTemp = {
              id: element.checkboxFieldName,
              value: element.checkboxValue,
              combinedFieldName: (<string>element.name).toLocaleLowerCase(),
            };
            tempGroupFieldNameArr.push(checkGroupTemp);
          }
        }

        tempGroupFieldNameArr.forEach(f => {
          checkboxArr.push(<IBaxModelMaszynyNoweFilterLine>{
            checkboxFieldName: f["id"],
            filterType: IBaxModelMaszynyNoweFilterTypeEnum.checkboxIf,
            checkboxValue: f["value"],
            name: f["combinedFieldName"]
          });
        })

        modelfilter.searchArr.forEach(s => {
          if (s.searchPhrase && s.searchPhrase.length > 0) {
            searchArr.push(s);
          }
        })

        return [...checkboxArr, ...modelfilter.numberArr, ...searchArr];
      }),
      debounceTime(750)
    ).subscribe(
      (_data: IBaxModelMaszynyNoweFilterLine[]) => {
        this.filterNew(_data);
      },
      (err) => console.log('search$ error', err),
      () => console.log('search$ finish..')
    )
  }


  filterNew(filters: IBaxModelMaszynyNoweFilterLine[]) {
    // console.log('filterNew | filters | maszynyNowe: ', filters.length, this.maszynyNoweList.length);

    // if(filters.length == 0 && this.maszynyNoweList.length==0) {
    //   this.clearFilterGroup(); 
    //   return;
    // }

    const checkBoxesFilters = filters.filter(f => f.filterType == IBaxModelMaszynyNoweFilterTypeEnum.checkboxIf);
    const otherFilters = filters.filter(f => f.filterType != IBaxModelMaszynyNoweFilterTypeEnum.checkboxIf);
    let maszynyfiltered: IBaxModelMaszynaNowa[] = [];
    //
    // first, filter checkboxes... 
    //
    let maszynyNoweCheckBoxFirstFilterArr: IBaxModelMaszynaNowa[] = [];
    this.maszynyNoweListAvailable.forEach(m => {
      if ((this.checkIfFilterLineFits(m, checkBoxesFilters) == true)) {
        maszynyNoweCheckBoxFirstFilterArr.push(m);
      }
    });
    maszynyNoweCheckBoxFirstFilterArr.forEach(m => {
      if ((this.checkIfFilterLineFits(m, otherFilters) == true)) {
        maszynyfiltered.push(m);
      }
    });

    this.maszynyNoweList = otherFilters.length > 0 ? [...maszynyfiltered] : [...maszynyNoweCheckBoxFirstFilterArr];
  }



  initFilterSearchGroups() {
    //
    // nazwaModelu
    //
    this.filterSearchArr$.push(this.getFilterLineFormGroup$(<IBaxModelMaszynyNoweFilterLine>{
      filterType: IBaxModelMaszynyNoweFilterTypeEnum.stringSearch,
      name: 'nazwaModelu'
    }));
  }




  initCheckboxGroups() {
    //
    // wybierz marke 
    //
    this.filterCheckboxArr$.push(this.getFilterLineFormGroup$(<IBaxModelMaszynyNoweFilterLine>{
      filterType: IBaxModelMaszynyNoweFilterTypeEnum.checkboxIf,
      name: 'sennebogen',
      checkboxFieldName: 'marka',
      checkboxValue: true,


    }));

    this.filterCheckboxArr$.push(this.getFilterLineFormGroup$(<IBaxModelMaszynyNoweFilterLine>{
      filterType: IBaxModelMaszynyNoweFilterTypeEnum.checkboxIf,
      name: 'yanmar',
      checkboxFieldName: 'marka',
      checkboxValue: true,
    }));
  }














  get isSennebogenFilter$(): FormControl {
    return <FormControl>this.filterCheckboxArr$.controls[0].get('checkboxValue');
  }

  get isYanmarFilter$(): FormControl {
    return <FormControl>this.filterCheckboxArr$.controls[1].get('checkboxValue');
  }

  get modelSearchGroup$(): FormGroup {
    return <FormGroup>this.filterSearchArr$.controls[0];
  }

  get filterNumberArr$(): FormArray {
    return <FormArray>this.filterGroup$.get('numberArr');
  }

  get filterCheckboxArr$(): FormArray {
    return <FormArray>this.filterGroup$.get('checkboxArr');
  }

  get filterSearchArr$(): FormArray {
    return <FormArray>this.filterGroup$.get('searchArr');
  }

}
