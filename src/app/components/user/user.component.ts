import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interface';

import { UserService } from '../../common/services/user.service';
import Swal from 'sweetalert2'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
 
  public currentRate = 8;
  public id: number;
  public name: string;
  public last_name: string;
  public email: string;
  public address: string;
  public state: string;
  public users: Usuario[] = [];
  
  constructor(
    private _user: UserService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this._user.getUsers()
      .subscribe((res: Usuario[]) => {
       
        this.users = res;
      })
  }

  public deleteUser(id) {
    this._user.deleteUser(id)
      .subscribe((res) => {
        this.users = this.users.filter(obj => obj.id != id);
        Swal.fire(
          'Eliminado!',
          'Usuario Eliminado!',
          'success'
        )
      })
  }

  public infoUser() {
    let data = {
      nombre: this.name,
      apellido: this.last_name,
      direccion: this.address,
      email: this.email
    }
    if (this.state == 'Crear') {
      this._user.createUser(data)
        .subscribe((res: Usuario) => {
          Swal.fire(
            'Creado!',
            'Usuario Creado!',
            'success'
          );
          this.users.push(res);
        })
    }
    this._user.updateUser(this.id, data)
      .subscribe((res: Usuario) => {
        Swal.fire(
          'Actualizado!',
          'Usuario Actualizado!',
          'success'
        );
        this.users = this.users.filter(obj => obj.id != this.id);
        this.users.push(res);
      });
      this.modalService.dismissAll();

  }

  public getModal(content) {
    return this.modalService.open(content);
  } 
  
  
  public openModal(content, id, create) {
    if (create) {
      this.state = 'Crear'
      this.name = '';
      this.last_name = '';
      this.email = '';
      this.address = '';
      this.getModal(content);
    } else {
      this.state = 'Actualizar'
      this._user.getUser(id)
      .subscribe((res: Usuario) => {
        this.id = res.id;
        this.name = res.nombre;
        this.last_name = res.apellido;
        this.address = res.direccion;
        this.email = res.email;
        this.getModal(content)
      })
    }
  }

  

}
