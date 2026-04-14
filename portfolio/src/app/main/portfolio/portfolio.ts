import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

export type ProjectStack = 'frontend' | 'backend' | 'fullstack';

interface Project {
  id: number;
  title: string;
  technologies: string[];
  description: string;
  image: string;
  liveTestLink: string;
  githubLink: string;
  stack: ProjectStack;
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})
export class Portfolio {
  private translate = inject(TranslateService);

  readonly stacks: ProjectStack[] = ['frontend', 'backend', 'fullstack'];

  selectedStack: ProjectStack = 'frontend';

  projects: Project[] = [
    {
      id: 1,
      title: 'Join',
      technologies: ['Angular | TypeScript | HTML | CSS | Firebase'],
      description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      image: 'img/portfolio/join-photo.png',
      liveTestLink: '#',
      githubLink: '#',
      stack: 'frontend'
    },
    {
      id: 2,
      title: 'Wraith',
      technologies: ['JavaScript | HTML | CSS'],
      description: 'A simple Jump-and-Run game based on an object-oriented approach. Help Wraith to find the way to the next level and defeat the boss.',
      image: 'img/portfolio/wraith-photo.png',
      liveTestLink: 'https://manuel-giehl.developerakademie.net/wraith/index.html',
      githubLink: 'https://github.com/ManuelGiehl/wraith',
      stack: 'frontend'
    },
    {
      id: 3,
      title: 'Pokédex',
      technologies: ['JavaScript | HTML | CSS | Api'],
      description: 'Based on the PokéAPI a simple library that provides and catalogues pokemon information.',
      image: 'img/portfolio/pokedex-photo.png',
      liveTestLink: 'https://manuel-giehl.developerakademie.net/modul8_pokedex/index.html',
      githubLink: 'https://github.com/ManuelGiehl/pokedex',
      stack: 'frontend'
    }
  ];

  selectStack(stack: ProjectStack): void {
    this.selectedStack = stack;
  }

  get filteredProjects(): Project[] {
    return this.projects.filter((p) => p.stack === this.selectedStack);
  }

  isStackActive(stack: ProjectStack): boolean {
    return this.selectedStack === stack;
  }

  getProjectDescription(projectTitle: string): string {
    const projectKey = projectTitle.toLowerCase();
    return this.translate.instant(`portfolio.projects.${projectKey}.description`);
  }
}
