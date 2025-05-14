import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../core/models/customer.model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  dataSource: MatTableDataSource<Customer>;
  displayedColumns: string[] = ['id', 'nombre', 'correo', 'direccion', 'telefono', 'preferencias', 'seguimientos', 'ultimoSeguimiento', 'actions'];
  customerForm: FormGroup; // Nombre correcto: customerForm
  editMode = false;
  selectedCustomerId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Customer>([]);
    this.customerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      preferencias: [''],
      seguimientos: [''],
      ultimoSeguimiento: [''],
    });
  }

  ngOnInit() {
    this.loadCustomers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
      this.dataSource.data = this.customers;
    });
  }

  openCustomerDialog(customer?: Customer) {
    this.editMode = !!customer;
    if (customer) {
      this.selectedCustomerId = customer.id!;
      this.customerForm.patchValue(customer);
    } else {
      this.selectedCustomerId = null;
      this.customerForm.reset();
    }
  }

  saveCustomer() {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }
    const customerData: Customer = this.customerForm.value;
    if (this.editMode && this.selectedCustomerId) {
      this.customerService.updateCustomer(this.selectedCustomerId, customerData).subscribe(() => {
        this.loadCustomers();
        this.customerForm.reset();
        this.editMode = false;
      });
    } else {
      this.customerService.createCustomer(customerData).subscribe(() => {
        this.loadCustomers();
        this.customerForm.reset();
      });
    }
  }

  deleteCustomer(id: number) {
    if (confirm('¿Estás seguro?')) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.loadCustomers();
      });
    }
  }
}