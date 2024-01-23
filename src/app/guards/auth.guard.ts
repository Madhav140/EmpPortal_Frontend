import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authStatus = inject(AuthService)
  const router = inject(Router)

  if(authStatus.islogged()){
    return true
  }
  else{
    Swal.fire({
      title: "Please Login",
      icon: "error"
    });
    router.navigateByUrl("")

    return false
  }

};
