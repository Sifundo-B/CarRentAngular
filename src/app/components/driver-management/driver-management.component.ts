import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DriverService } from 'src/app/services/driver.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.scss']
})
export class DriverManagementComponent implements OnInit {
  driverForm: FormGroup;
  drivers: any[] = [];
  loading = false;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private driverService: DriverService
  ) {
    this.driverForm = this.fb.group({
      name: [''],
      licenseFile: [null]
    });
  }

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers() {
    this.driverService.getDrivers().subscribe(
      (drivers) => {
        this.drivers = drivers;
      },
      (error) => {
        console.error('Failed to load drivers', error);
      }
    );
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.driverForm.patchValue({ licenseFile: file });
    }
  }

  addDriver() {
    if (this.driverForm.invalid) {
      return;
    }

    this.loading = true;

    const driverData = this.driverForm.value;
    this.driverService.addDriver(
      { name: driverData.name },
      driverData.licenseFile
    ).subscribe(
      (response) => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Driver Added Successfully',
          text: 'The driver has been added and license uploaded.',
        });
        this.loadDrivers(); // Refresh the driver list
        this.driverForm.reset(); // Clear the form after submission
        this.fileInput.nativeElement.value = ''; // Clear the file input
      },
      (error) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Failed to Add Driver',
          text: 'There was an issue adding the driver. Please try again.',
        });
        console.error('Failed to add driver', error);
      }
    );
  }
}
