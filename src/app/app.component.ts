import { Component, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';
let noCase = require('no-case');

@Component({
  selector: 'fm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  data = {
    meta: { id: uuid(), title: '', sections: [] },
    currentSection: null,
    currentScreen: null,
    currentScreenPart: null,
    defaultName: '<noname>',
  };

  screenTypes = ['composite', 'table', 'information'];
  responseTypes = ['text-response', 'single-response', 'multiple-response'];
  dataTypes = ['string', 'text', 'number', 'date', 'time', 'datetime'];

  constructor() {
  }

  ngOnInit(): void {
    document.getElementById('file-input')
      .addEventListener('change', (e) => this.readSingleFile(e), false);
  }

  responseTypeChanged(screenPart) {
    switch (screenPart.responseType) {
      case 'single-response':
      case 'multiple-response':
        screenPart.responseOptions = screenPart.responseOptions || [];
        break;
      case 'text-response': {
        delete screenPart.responseOptions;
      }
    }
  }

  addResponseOption(screenPart, optionName) {
    screenPart.responseOptions.push(optionName);
    screenPart._lastResponseOptionName = '';
  }

  removeResponseOption(screenPart, option) {
    const index = screenPart.responseOptions.indexOf(option);
    if (index >= 0) {
      screenPart.responseOptions.splice(index, 1);
    }
  }

  setResponseKey(response) {
    if (response.responseKey) return;
    response.responseKey = noCase(response.title, null, '_');
  }

  setResponseTarget(screenPart, ignore) {
    if (screenPart.responseTarget && !ignore) return;

    const sectionResponseKey = screenPart._parent._parent.responseKey;
    const screenReponseKey = screenPart._parent.responseKey;
    screenPart.responseTarget = `${sectionResponseKey}.${screenReponseKey}.${screenPart.responseKey}`;
  }

  download() {
    const w = window as any;
    const a = document.getElementById('download') as any;
    a.download = 'meta.json';


    a.href = 'data:application/json;base64,' +
      w.btoa(w.unescape(encodeURIComponent(this.serializeMeta())));
  }

  serializeMeta() {
    return JSON.stringify(this.data.meta, (key, value) => key.match(/^_/) ? undefined : value, 2)
  }

  readSingleFile(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (z: any) => {
      const contents = z.target.result;
      this.data.meta = JSON.parse(contents);

      this.data.meta.sections.forEach(section => {
        section.screens.forEach(screen => {
          screen._parent = section;
          screen.screenParts.forEach(part => {
            part._parent = screen;
          })
        });
      })

      this.data.currentSection = this.data.meta.sections[0];
      this.data.currentScreen = this.data.currentSection.screens[0];
      this.data.currentScreenPart = this.data.currentScreen.screenParts[0];
    };
    reader.readAsText(file);
  }
}
