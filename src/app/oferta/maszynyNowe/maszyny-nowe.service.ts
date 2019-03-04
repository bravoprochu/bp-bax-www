import { Injectable } from '@angular/core';
import { OfertaService } from '../oferta.service';
import { IBaxModelMaszynaNowa } from '../interfaces/i-bax-model-maszyna-nowa';
import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BAX_MODEL_SPEC_LIST_DESCRIPTION } from '../data/bax-model-spec-description';
import { BAX_MASZYNY_NOWE } from '../data/bax-maszyny-nowe';
import { IBaxModelSpecGroup } from '../interfaces/i-bax-model-spec-group';
import { IBaxModelSpecLine } from '../interfaces/i-bax-model-spec-line';
import { BAX_MODEL_SPEC_LIST_GROUPS } from '../data/bax-model-spec-groups';
import { map, switchMap, debounceTime, tap, filter, startWith } from 'rxjs/operators';
import { BaxMarka } from '../enums/bax-marka-enum';
import { environment } from 'src/environments/environment';
import { IBaxModelMaszynyNoweFilterGroup } from '../interfaces/i-bax-model-maszyny-nowe-filter-group';
import { IBaxModelMaszynyNoweFilterLine } from '../interfaces/i-bax-model-maszyny-nowe-filter-line';

@Injectable({
  providedIn: 'root'
})
export class MaszynyNoweService {
  filterSelect$: FormControl = new FormControl();
  filterSelected$: FormArray;
  filterAvailable: IBaxModelMaszynyNoweFilterLine[] = [];
  filterGroupsAvailable: IBaxModelMaszynyNoweFilterGroup[] = [];
  isFilterLengthCount: boolean = true;

  maszynyNoweList: IBaxModelMaszynaNowa[] = [];
  maszynyNoweListAvailable: IBaxModelMaszynaNowa[] = [];
  // maszynyNoweListFilter: IBaxSpecFilter[] = [];
  // maszynyNoweListFiltered: IBaxSpecFilter[] = [];
  // maszynyNoweFilterSelect$: FormControl;

  
  
  constructor(private fb: FormBuilder) {
    this.UpdateMediaImgUrl(this.getModelList());
    this.filterSelected$ = this.fb.array([]);
    
    this.maszynyNoweListAvailable = this.getModelList();
    this.maszynyNoweListAvailable.forEach(f=>this.maszynyNoweList.push(f));
    this.filterAvailable = this.getMaszynyNoweFilters();
    this.filterGroupsAvailable = this.getMaszynyNoweFilterGroups();
    
    this.initObservables();
  }


  private filterCheckIfFilterLineFits(dest: IBaxModelMaszynaNowa, filterLines:IBaxModelMaszynyNoweFilterLine[]):boolean {
    let res:boolean = false;
    let counter = 1;

    for(let i=0; i<filterLines.length; i++) {
      const filter= filterLines[i];
     
      const prop = filter.name;
      const propValue = dest[prop];
      if(!propValue) {res = false; break}
      res = (propValue >= filter.minFilter && propValue <= filter.maxFilter) ? true : false;
      if(res == false) {break;}
    };
    
    return res;
  }

  maszynyNoweFilterClear() {
      this.filterSelect$.reset();
  }




  filter(srcAllModels: IBaxModelMaszynaNowa[], destFiltered: IBaxModelMaszynaNowa[], filterLines: IBaxModelMaszynyNoweFilterLine[]){
    console.log('filter: filterLines !', filterLines);
    
    srcAllModels.forEach(srcModel=>{
      const srcIdx = srcAllModels.indexOf(srcModel);
      const foundOnDest = destFiltered.indexOf(srcModel);
      if(this.filterCheckIfFilterLineFits(srcModel, filterLines)){
        if(foundOnDest<0){
          destFiltered.splice(srcIdx, 0, srcModel);
        }
      } else {
        if(foundOnDest>-1){
          destFiltered.splice(foundOnDest,1);
        }
      }
    });
    this.isFilterLengthCount = true;
  }



  filterFilterGroupListUpdate(filterList: IBaxModelMaszynyNoweFilterLine[]) {
    console.log('filterList:', filterList);


    let controlsToRemove: number[] = [];
    let controlsToAdd: number[] = [];

    if(filterList==null || filterList.length==0) {
      console.log('filter emtpy or null', this.filterSelected$.value, filterList);
      this.filterSelected$.controls = [];

      console.log('filterSelected$: ', this.filterSelected$.controls);
      return;
    }

    if(this.filterSelected$.controls.length == 0) {
      filterList.forEach(f=>this.filterSelected$.push(this.getFilterGroup$(f)));
      return;
    };

    const _controls = this.filterSelected$.value;

    // remove filters
    for(let i = 0; i<_controls.length; i++) {
      const controlGroup: IBaxModelMaszynyNoweFilterLine = _controls[i];
     
      const filterAlreadyExists = filterList.find(f=>f.name == controlGroup['name']);
      console.log(`group  ${i}: ${controlGroup['name']}, ${filterAlreadyExists}`);

      if(!filterAlreadyExists) {
        controlsToRemove.push(i);
      }
    }

    controlsToRemove.forEach(f=>this.filterSelected$.removeAt(f));

    filterList.forEach(filter=>{
      const foundOnControls = (<IBaxModelMaszynyNoweFilterLine[]>_controls).find(f=>f.name == filter.name);
      if(!foundOnControls) {this.filterSelected$.push(this.getFilterGroup$(filter))};
    });
    
    
  }

  
  initObservables(){
    this.filterSelect$.valueChanges.pipe(
      map((_filterList: IBaxModelMaszynyNoweFilterLine[])=> {
        this.filterFilterGroupListUpdate(_filterList);
        return _filterList;
      }),
      switchMap((_list: IBaxModelMaszynyNoweFilterLine[])=>{
        console.log('sw filter lines...', this.filterSelected$.value);
        this.filter(this.getModelList(), this.maszynyNoweList, this.filterSelected$.value);
        console.log('then switchTo selected$ valueChange..');
        
        return this.filterSelected$.valueChanges.pipe(
          tap(()=>this.isFilterLengthCount = false),
        )
      }),
      debounceTime(750),
      map((_filterChanged: IBaxModelMaszynyNoweFilterLine[])=>{
        this.filter(this.getModelList(), this.maszynyNoweList, _filterChanged);
        return _filterChanged;
      }),
      //tap(()=>this.isFilterLengthCount=true)
    )
    .subscribe(
      (_data: any) => {
      },
      (err) => console.log('filterSelect$ error', err),
      () => console.log('filterSelect$ finish..')
    )
      
  }

  isModelSpecCardInfo: FormControl = new FormControl(false);


  getMaszynyNoweFilterGroups(): IBaxModelMaszynyNoweFilterGroup[] {
    this.filterGroupsAvailable = [];
    let res: IBaxModelMaszynyNoweFilterGroup[] = [];

    const _filters = this.getMaszynyNoweFilters();

    _filters.forEach(f=>{
      const filterLine = <IBaxModelMaszynyNoweFilterLine> {
        label: f.label,
        max: f.max,
        maxFilter: f.maxFilter,
        min: f.min,
        minFilter: f.minFilter,
        name: f.name
      };

      let groupFound = res.find(g=>g.groupName == f.groupName);      
      if(groupFound){
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

  getModelList(): IBaxModelMaszynaNowa[] {
    const data = BAX_MASZYNY_NOWE;
    return data;
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

  private UpdateMediaImgUrl(modelList: IBaxModelMaszynaNowa[]) {
    modelList.forEach(f => {
      if (f.mediaCardImg) {
        const _mediaCardImg = f.mediaCardImg.trim();
        f.mediaCardImg = `./assets/oferta/modele/${f.marka.trim().toLowerCase()}/${_mediaCardImg}`
      } else {
        f.mediaCardImg = './assets/svg/logotypy/logo_bax_signOnly.svg';
      };

      const logotypUrl = "./assets/svg/logotypy";

      //this.isReady= true;
      switch(f.markaId) {
        case BaxMarka.Yanmar:
        f.modelBackground = environment.colorYanmar;
        f.modelLogo = `${logotypUrl}/logo_yanmar.svg`;
        break;
        
        case BaxMarka.Sennebogen:
        f.modelBackground = environment.colorSennebogen;
        f.modelLogo = `${logotypUrl}/logo_sennebogen.svg`;
        break;
  
        case BaxMarka.Arjes:
        f.modelBackground = environment.colorArjes;
        f.modelLogo = `${logotypUrl}/logo_yanmar.svg`;
        break;
  
        case BaxMarka.Zemmler:
        f.modelBackground = environment.colorZemler
        break;
  
      }


    }
    );
  }
  
  private getFilterGroup$(filter?: IBaxModelMaszynyNoweFilterLine): FormGroup {
    return this.fb.group({
        groupName: [filter.groupName],
        name: [filter.name],
        label: [filter.label],
        min: [filter.min],
        max: [filter.max],
        minFilter: [filter.minFilter],
        maxFilter: [filter.maxFilter]
    });
  }

}
