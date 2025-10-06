import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Project {
  id: number;
  title: string;
  technologies: string[];
  description: string;
  image: string;
  liveTestLink: string;
  githubLink: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, RouterModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})
export class Portfolio {
  projects: Project[] = [
    {
      id: 1,
      title: 'Join',
      technologies: ['Angular | TypeScript | HTML | CSS | Firebase'],
      description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      image: 'img/portfolio/join-photo.png',
      liveTestLink: '#',
      githubLink: '#'
    },
    {
      id: 2,
      title: 'Wraith',
      technologies: ['JavaScript | HTML | CSS'],
      description: 'A simple Jump-and-Run game based on an object-oriented approach. Help Wraith to find the way to the next level and defeat the boss.',
      image: 'img/portfolio/wraith-photo.png',
      liveTestLink: 'https://manuel-giehl.developerakademie.net/wraith/index.html',
      githubLink: 'https://github.com/ManuelGiehl/wraith'
    },
    {
      id: 3,
      title: 'Pokédex',
      technologies: ['JavaScript | HTML | CSS | Api'],
      description: 'Based on the PokéAPI a simple library that provides and catalogues pokemon information.',
      image: 'img/portfolio/pokedex-photo.png',
      liveTestLink: 'https://manuel-giehl.developerakademie.net/modul8_pokedex/index.html',
      githubLink: 'https://github.com/ManuelGiehl/pokedex'
    }
  ];
}
