import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../core/services/vehicle.service';
import { Vehicle } from '../../core/models/vehicle.model';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  displayedColumns: string[] = ['id', 'marca', 'modelo', 'anio', 'caracteristicas', 'estado', 'actions'];
  vehicleForm: FormGroup;
  editMode = false;
  selectedVehicleId: number | null = null;

  constructor(
    private vehicleService: VehicleService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.vehicleForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: ['', Validators.required],
      caracteristicas: [''],
      estado: [''],
    });
  }

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehicleService.getVehicles().subscribe(data => {
      this.vehicles = data;
    });
  }

  openVehicleDialog(vehicle?: Vehicle) {
    this.editMode = !!vehicle;
    if (vehicle) {
      this.selectedVehicleId = vehicle.id!;
      this.vehicleForm.patchValue(vehicle);
    } else {
      this.selectedVehicleId = null;
      this.vehicleForm.reset();
    }
  }

  saveVehicle() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }
    const vehicleData: Vehicle = this.vehicleForm.value;
    if (this.editMode && this.selectedVehicleId) {
      this.vehicleService.updateVehicle(this.selectedVehicleId, vehicleData).subscribe(() => {
        this.loadVehicles();
        this.vehicleForm.reset();
        this.editMode = false;
      });
    } else {
      this.vehicleService.createVehicle(vehicleData).subscribe(() => {
        this.loadVehicles();
        this.vehicleForm.reset();
      });
    }
  }

  deleteVehicle(id: number) {
    if (confirm('¿Estás seguro?')) {
      this.vehicleService.deleteVehicle(id).subscribe(() => {
        this.loadVehicles();
      });
    }
  }
}