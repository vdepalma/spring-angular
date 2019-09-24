import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private cliente: Cliente = new Cliente();
  private titulo : string ="Crear Cliente";

  constructor(private clienteService: ClienteService,private router : Router, private activatedRoute:ActivatedRoute ) { }

  ngOnInit() {
    this.cargarCliente();
  }

public cargarCliente():void{
  this.activatedRoute.params.subscribe(params => {
    let id= params['id'];
    if(id){
      this.clienteService.getCliente(id).subscribe((cliente)=> this.cliente = cliente);
    }
  })
}

public create():void{
  this.clienteService.create(this.cliente).subscribe(
    response => {
      this.router.navigate(['/clientes'])
      swal('Nuevo Cliente', `Cliente ${this.cliente.nombre + " "+ this.cliente.apellido} creado con éxito.`, 'success')
    }
  )
}

public update():void{
  this.clienteService.update(this.cliente).subscribe(
    response => {
      this.router.navigate(['/clientes'])
      swal('Actualizar Cliente', `Cliente ${this.cliente.nombre} ${this.cliente.apellido} actualizado con éxito.`, 'success')
    }
  )
}

public delete():void{
    swal('Eliminar Cliente', `¿Está seguro que desea eliminar al cliente: ${this.cliente.nombre} ${this.cliente.apellido}?`, 'question')
  this.clienteService.delete(this.cliente.id).subscribe(
    response => {
      swal('Eliminar Cliente', `Cliente ${this.cliente.nombre} ${this.cliente.apellido} eliminado con éxito.`, 'success')
      this.router.navigate(['/clientes'])
    }
  )
}
}
