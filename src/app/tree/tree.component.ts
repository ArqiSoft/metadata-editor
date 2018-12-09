import { Component, Input, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid/index';

@Component({
  selector: 'fm-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {

  @Input() data: any;

  constructor() {
  }

  ngOnInit() {
  }

  addSection(meta) {
    const section = {
      id: uuid(),
      responseKey: '',
      title: this.data.defaultName,
      screens: [],
    };
    meta.sections.push(section);
    this.selectSection(section);
  }

  addScreen(section) {
    const screen = {
      _parent: section,
      responseKey: '',
      id: uuid(),
      title: this.data.defaultName,
      screenType: 'composite',
      screenParts: [],
    };

    // TODO
    // if (screen.screenType === 'table') {
    //   section.canAddRows = false;
    //   section.canRemoveRows = false;
    // }
    section.screens.push(screen);
    this.selectScreen(screen);
  }

  addScreenPart(screen) {
    const screenPart = {
      _parent: screen,
      id: uuid(),
      title: this.data.defaultName,
      instructions: '',
      responseType: 'text-response',
      dataType: 'string',
      responseKey: '', responseTarget: '',
      validation: {
        mandatory: false, minLength: 0, maxLength: 100,
      },
    };
    screen.screenParts.push(screenPart);
    this.selectScreenPart(screenPart);
  }

  removeSection(section) {
    const index = this.data.meta.sections.indexOf(section);
    if (index >= 0) {
      this.data.meta.sections.splice(index, 1);
      this.data.currentSection = null;
    }
  }

  removeScreen(screen) {
    const index = screen._parent.screens.indexOf(screen);
    if (index >= 0) {
      screen._parent.screens.splice(index, 1);
      this.data.currentScreen = null;
    }
  }

  removeScreenPart(screenPart) {
    const index = screenPart._parent.screenParts.indexOf(screenPart);
    if (index >= 0) {
      screenPart._parent.screenParts.splice(index, 1);
      this.data.currentScreenPart = null;
    }
  }

  selectSection(section) {
    if (this.data.currentSection === section) {
      return;
    }

    this.data.currentSection = section;
    this.data.currentScreen = null;
    this.data.currentScreenPart = null;
  }

  selectScreen(screen) {
    if (this.data.currentScreen === screen) {
      return;
    }
    this.data.currentSection = screen._parent;
    this.data.currentScreen = screen;
    this.data.currentScreenPart = null;

  }

  selectScreenPart(screenPart) {
    this.data.currentSection = screenPart._parent._parent;
    this.data.currentScreen = screenPart._parent;
    this.data.currentScreenPart = screenPart;
  }

  getById() {

  }

}
