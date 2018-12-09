import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fm-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
})
export class TreeNodeComponent implements OnInit {
  @Input() name;
  @Input() selected;
  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();
  addExists = false;
  removeExists = false;

  constructor() {

  }

  ngOnInit() {
    this.addExists = !!this.add.observers.length;
    this.removeExists = !!this.remove.observers.length;
  }

}
