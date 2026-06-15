import {Routes } from '@angular/router';
import { AssetHistoryComponent } from './asset-history/asset-history.component';
import { AssetRegistryComponent } from './asset-registry/asset-registry.component';
import { AssetTypeComponent } from './asset-type/asset-type.component';

export const ASSET_ROUTES: Routes = [
    {
        path: 'registry',
        component: AssetRegistryComponent,
    },
    {
        path: 'history',
        component: AssetHistoryComponent,
    },
    {
        path: 'types',
        component: AssetTypeComponent,
    },
];