import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[]
  faEdit= faEdit;
  faTrashAlt= faTrashAlt;
  constructor(private clienteService : ClienteService, private router:Router) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

public delete(cliente:Cliente):void{
      swal({
        title: 'Eliminar',
        text: "¿Está seguro que desea eliminar al cliente?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, elimínalo!',
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.value) {
          this.clienteService.delete(cliente.id).subscribe(
            response => {
              this.clientes = this.clientes.filter(cli=> cli!==cliente)
              swal('Eliminar Cliente', `Cliente ${cliente.nombre} ${cliente.apellido} eliminado con éxito.`, 'success')
              this.router.navigate(['/clientes'])
            })
        }
      })
    }

  }
