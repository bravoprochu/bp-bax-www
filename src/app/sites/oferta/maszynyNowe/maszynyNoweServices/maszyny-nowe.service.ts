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
import { Params } from '@angular/router';

@Injectable({
  providedIn: MaszynyNoweServicesModule
})
export class MaszynyNoweService {
  filterForm$: FormGroup;
  filterNumberSelect$: FormControl = new FormControl();
  filterAvailable: IBaxModelMaszynyNoweFilterLine[] = [];
  filterGroupsAvailable: IBaxModelMaszynyNoweFilterGroup[] = [];
  isFilterLengthCount: boolean = true;
  isModelSpecCardInfo: FormControl = new FormControl(true);
  isQueryParams: boolean;

  maszynyNoweList: IBaxModelMaszynaNowa[] = [];
  maszynyNoweListAvailable: IBaxModelMaszynaNowa[] = [];

  queryParamsMarka: string;
  queryParamsBranza: string;
  queryParmasModelSearch: string;






  constructor(
    private fb: FormBuilder,
  ) {
    this.filterForm$ = this.getFilterForm$();
    this.initFilterSearchGroups();
    this.filterForm$.markAsPristine();
    this.initObservables();
  }

  initData(queryParams: Params) {

    this.maszynyNoweList = [];  

    this.filterAvailable = this.getMaszynyNoweFilters();
    this.filterGroupsAvailable = this.getFilterNumberLineGroups();


    this.queryParamsFilter(queryParams);

    this.prepModelSearch()
    this.prepCheckboxGroupsBranzaList();
    this.prepCheckboxGroupsMarkaList();
    this.prepCheckboxGroupsZasilanieList();
    // this.clearFilterGroup();
    this.filterForm$.markAsPristine();
  }


  clearFilterGroup() {
    this.filterNumberSelect$.reset(null, { emitEvent: false });
    this.filterNumberArr$.controls = [];
    
    this.modelSearchFormControl$.setValue("", { emitEvent: false });
     
    
    this.setCheckboxGroupsToChecked();
    
    this.maszynyNoweList = [...this.maszynyNoweListAvailable];
    this.filterForm$.markAsPristine();
  }


  filterLineConvertToGroup(filterList: IBaxModelMaszynyNoweFilterLine[]) {
    let controlsToRemove: number[] = [];

    if (filterList == null || filterList.length == 0) {
      this.filterNumberArr$.reset();
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
      checkboxGroups: this.fb.group({
        branza: this.fb.array([]),
        marka: this.fb.array([]),
        zasilanie: this.fb.array([]),
      })
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
      // map((_filterLines: IBaxModelMaszynyNoweFilterLine[]) => {
        
      //   return _filterLines
      // }),
    ).subscribe(
      (_data: IBaxModelMaszynyNoweFilterLine[]) => {
      // this.filterForm$.updateValueAndValidity();
      this.filterLineConvertToGroup(_data);
      if(_data.length == 0) {
        this.filterNumberArr$.controls = [];
        this.filterNumberArr$.reset();
      }
      this.filterForm$.markAsDirty();
      },
      (err) => console.log('filterNumberSelect error', err),
      () => console.log('filterNumberSelect finish..')
    )



    this.filterForm$.valueChanges.pipe(
      map((modelFilter: IBaxModelFilter) => {
        return modelFilter;
      }),
      debounceTime(750)
    ).subscribe(
      (_data: IBaxModelFilter) => {
        this.filterNew(_data);
      },
      (err) => console.log('search$ error', err),
      () => console.log('search$ finish..')
    )
  }


  getValidFilters(src: IBaxModelFilter): IBaxModelFilter {
    let res = <IBaxModelFilter>{
      checkboxGroups: {
        branza: [],
        marka: [],
        zasilanie: [],
      },
      numberArr: [],
      searchArr: []
    }
    res.checkboxGroups.branza = src.checkboxGroups.branza.filter(f => f.checkboxValue == true);
    res.checkboxGroups.marka = src.checkboxGroups.marka.filter(f => f.checkboxValue == true);
    res.checkboxGroups.zasilanie = src.checkboxGroups.zasilanie.filter(f => f.checkboxValue == true);
    res.numberArr = [...src.numberArr];
    res.searchArr = src.searchArr.filter(f => f.searchPhrase != null && f.searchPhrase.length > 0);

    return res;
  }



  checkIfAnyElOnStringArrFitsFiltersArr(stringArr: string[], destArr: any[], field: string): boolean {
    let found: boolean = false;
    if (stringArr === undefined || stringArr.length == 0) { return found; }
    for (let i = 0; i < stringArr.length; i++) {
      const srcEl = stringArr[i];
      //
      // loop throw destArr to find fitting el
      //
      for (let d = 0; d < destArr.length; d++) {
        const destEl = destArr[d];
        if (srcEl == destEl[field]) {
          found = true;
          break;
        }
      }
      if (found === true) {
        break;
      }
    }
    return found
  }



  filterNew(filters: IBaxModelFilter) {
    //
    // prep checkboxes with true (selected) value
    //
    this.maszynyNoweList = [];
    const validFilters = this.getValidFilters(filters);


    //
    // maszyna has to fits ALL  filters groups (checkboxes gruoups (all), selected numbers filters and search - string filters)
    //
    this.maszynyNoweListAvailable.forEach(maszyna => {

      //
      // check if any of checkbox filters group fits
      //
      let checkBranzaFits = this.checkIfAnyElOnStringArrFitsFiltersArr(maszyna.branzaList, validFilters.checkboxGroups.branza, "name");
      let checkMarkaFits = this.checkIfAnyElOnStringArrFitsFiltersArr([maszyna.marka], validFilters.checkboxGroups.marka, "name");
      let checkZasilanieFits = this.checkIfAnyElOnStringArrFitsFiltersArr(maszyna.zasilanieList, validFilters.checkboxGroups.zasilanie, "name");

      //
      // check search filters. Fits if all filters are valid
      //
      let searchFits = this.checkIfFitsSearchFiltersArr(maszyna, validFilters.searchArr);

      //
      // check number - more/less filters
      //
      let checkNumbersFits = this.checkIfElFitsNumberFiltersArr(maszyna, validFilters.numberArr);


      if (checkBranzaFits && checkMarkaFits && checkZasilanieFits && searchFits && checkNumbersFits) {
        this.maszynyNoweList.push(maszyna);
      }



    })

  }


  checkIfElFitsNumberFiltersArr(maszyna: IBaxModelMaszynaNowa, numbersFilters: IBaxModelMaszynyNoweFilterLine[]): boolean {

    if(numbersFilters.length == 0) {return true;}
    let isOk: boolean = false;
    for (let i = 0; i < numbersFilters.length; i++) {
      const filter = numbersFilters[i];
      const propValue = maszyna[filter.name];
      let res = (propValue && propValue >= filter.minFilter && propValue <= filter.maxFilter) ? true : false;
      if (res) { isOk = true; continue; } else { isOk= false; break; }    
    }
    return isOk;
  }


  checkIfFitsSearchFiltersArr(maszyna: IBaxModelMaszynaNowa, searchFilters: IBaxModelMaszynyNoweFilterLine[]): boolean {
    if (searchFilters.length == 0) { return true; }
    let isOk: boolean = false;
    for (let i = 0; i < searchFilters.length; i++) {
      const filter = searchFilters[i];

      if ((<string>maszyna[filter.name]).toLowerCase().includes(filter.searchPhrase.toLowerCase())) {
        isOk = true;
        continue;
      } else {
        isOk = false;
        break;
      }
    }
    return isOk;
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



  private queryParamsFilter(queryParams: Params) {
    this.queryParamsBranza = queryParams["branza"];
    this.queryParamsMarka = queryParams["marka"];
    this.queryParmasModelSearch = queryParams["search"];


    this.isQueryParams = (this.queryParmasModelSearch || this.queryParamsMarka || this.queryParamsBranza) ? true : false;
  }



  private prepCheckboxGroupsBranzaList() {
    let branzaGroup$ = <FormArray>this.filterCheckboxGroupArr$.get('branza');
    branzaGroup$.controls = [];
    this.getBranzaList().forEach(branza => {

      branzaGroup$.push(this.getFilterLineFormGroup$(<IBaxModelMaszynyNoweFilterLine>{
        filterType: IBaxModelMaszynyNoweFilterTypeEnum.checkboxIf,
        name: branza,
        checkboxFieldName: 'branzaList',
        checkboxValue: true,
      }));

    });
  }


  private prepCheckboxGroupsMarkaList() {
    let markaGroup$ = <FormArray>this.filterCheckboxGroupArr$.get('marka');
    markaGroup$.controls = [];

    this.getMarkaList().forEach(marka => {
      markaGroup$.push(this.getFilterLineFormGroup$(<IBaxModelMaszynyNoweFilterLine>{
        filterType: IBaxModelMaszynyNoweFilterTypeEnum.checkboxIf,
        name: marka,
        checkboxFieldName: 'marka',
        checkboxValue: this.isQueryParams ? (this.queryParamsMarka.toLowerCase() == marka.toLowerCase() ? true : false) : true
      }));

    });
  }


  private prepCheckboxGroupsZasilanieList() {
    let zasilanieGroup$ = <FormArray>this.filterCheckboxGroupArr$.get('zasilanie');
    zasilanieGroup$.controls = [];

    this.getZasilanieList().forEach(zasilanie => {

      zasilanieGroup$.push(this.getFilterLineFormGroup$(<IBaxModelMaszynyNoweFilterLine>{
        filterType: IBaxModelMaszynyNoweFilterTypeEnum.checkboxIf,
        name: zasilanie,
        checkboxFieldName: 'zasilanieList',
        checkboxValue: true,
      }));

    });
  }


  private prepModelSearch() {
    this.modelSearchFormControl$.setValue(this.isQueryParams && this.queryParmasModelSearch ? this.queryParmasModelSearch : '');
  }


  private getBranzaList() {
    let res: string[] = [];
    this.maszynyNoweListAvailable.forEach(maszyna => {
      if (maszyna.branzaList.length > 0) {
        maszyna.branzaList.forEach(branza => {
          let found = res.indexOf(branza);
          if (found < 0) {
            res.push(branza);
          }
        })
      }
    })
    return res.sort();
  }

  private getMarkaList() {
    let res: string[] = [];
    this.maszynyNoweListAvailable.forEach(maszyna => {
      let found = res.indexOf(maszyna.marka);
      if (found < 0) {
        res.push(maszyna.marka);
      }
    })
    return res.sort();
  }

  private getZasilanieList() {
    let res: string[] = [];
    this.maszynyNoweListAvailable.forEach(maszyna => {
      if (maszyna.zasilanieList.length > 0) {
        maszyna.zasilanieList.forEach(zasilanie => {
          let found = res.indexOf(zasilanie);
          if (found < 0) {
            res.push(zasilanie);
          }
        })
      }
    })
    return res.sort();
  }



  private setCheckboxGroupsToChecked()
  {
    //
    // check branza
    //
    this.branzaListArr$.controls.forEach(f=>{
      (<FormControl>f.get('checkboxValue')).setValue(true, {emitEvent: false});
    });

    //
    // check marka
    //
    this.markaListArr$.controls.forEach(f=>{
      (<FormControl>f.get('checkboxValue')).setValue(true, {emitEvent: false});
    });

    //
    // check zasilanie
    //
    this.zasilanieListArr$.controls.forEach(f=>{
      (<FormControl>f.get('checkboxValue')).setValue(true, {emitEvent: false});
    });
  }


  get branzaListArr$(): FormArray {
    return <FormArray>this.filterCheckboxGroupArr$.get('branza');
  }

  get markaListArr$(): FormArray {
    return <FormArray>this.filterCheckboxGroupArr$.get('marka');
  }


  get modelSearchGroup$(): FormGroup {
    return <FormGroup>this.filterSearchArr$.controls[0];
  }

  get modelSearchFormControl$(): FormControl {
    return (<FormControl>this.modelSearchGroup$.get(this.getFilterSearchFieldName()))
  }

  get filterNumberArr$(): FormArray {
    return <FormArray>this.filterForm$.get('numberArr');
  }

  get filterCheckboxGroupArr$(): FormGroup {
    return <FormGroup>this.filterForm$.get('checkboxGroups');
  }

  get filterSearchArr$(): FormArray {
    return <FormArray>this.filterForm$.get('searchArr');
  }

  get zasilanieListArr$(): FormArray {
    return <FormArray>this.filterCheckboxGroupArr$.get('zasilanie');
  }




}


