import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'tabs/serie/:id', loadChildren: () => import('./pages/serie-details/serie-details.module').then( m => m.SerieDetailsPageModule) },
  { path: 'tabs/episode/:id', loadChildren: () => import('./pages/episode/episode.module').then( m => m.EpisodePageModule) },
  { path: 'tabs/episode/:id/:imdb_id', loadChildren: () => import('./pages/episode/episode.module').then( m => m.EpisodePageModule) },
  { path: 'tabs/episode/:id/:season/:ep', loadChildren: () => import('./pages/episode/episode.module').then( m => m.EpisodePageModule) },
  {
    path: 'tabs/profil/:id',
    loadChildren: () => import('./pages/profil/profil.module').then( m => m.ProfilPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
