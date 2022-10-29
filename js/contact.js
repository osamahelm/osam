var inputName=document.getElementById('name');
var inputEmail=document.getElementById('email');
var inputNumber=document.getElementById('num');
var inputAge=document.getElementById('age');
var inputPass=document.getElementById('pass');
var inputRepass=document.getElementById('repass');

let namealert = document.getElementById('namealert')
function validateName(){
  var pnameRegex = /^[A-Z][a-z]{3,10}$/;
  
    let pname=inputName.value
    
  if(/^[A-Z]/.test(pname) == true){
      if(/[a-z]{3,10}$/.test(pname) == true){
        namealert.classList.add('d-none')
    inputName.classList.add('is-valid')
        inputName.classList.remove('is-invalid')
     
          return true;
      }else{
      namealert.innerHTML='productname should be between 3-10 char'
      inputName.classList.add('is-invalid')
     inputName.classList.remove('is-valid')
        namealert.classList.remove('d-none')
         return false;
      }
  }else{
       namealert.innerHTML ='please start with capital letter'
      inputName.classList.add('is-invalid')
      inputName.classList.remove('is-valid')
      namealert.classList.remove('d-none')
    return false;
  }
}


inputEmail.addEventListener('input',()=>{
			let emailalert = document.getElementById('emailalert')
			const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/;

			if(email.value.match(emailPattern)){
				inputEmail.classList.add('is-valid');
				inputEmail.classList.remove('is-invalid');
			emailalert.classList.add('d-none')
			}else{
				inputEmail.classList.add('is-invalid');
				inputEmail.classList.remove('is-valid');
				emailalert.classList.remove('d-none')
			}
		});

inputNumber.addEventListener('input',()=>{
			let phonealert = document.getElementById('phonealert')
			const phonalert =/^01[0125][0-9]{8}$/;

			if(inputNumber.value.match(phonalert)){
				inputNumber.classList.add('is-valid');
                inputNumber.classList.remove('is-invalid');
				phonealert.classList.add('d-none')
			}
            else{
			inputNumber.classList.add('is-invalid');
				inputNumber.classList.remove('is-valid');
				phonealert.classList.remove('d-none')
			}
		});
inputAge.addEventListener('input',()=>{
			let agealert = document.getElementById('agealert')
			const agePattern =/^\S[0-9]{0,3}$/;

			if(inputAge.value.match(agePattern)){
				inputAge.classList.add('is-valid');
                inputAge.classList.remove('is-invalid');
				agealert.classList.add('d-none')
			}
            else{
			inputAge.classList.add('is-invalid');
				inputAge.classList.remove('is-valid');
				agealert.classList.remove('d-none')
			}
		});

 inputPass.addEventListener('input',()=>{
			let passalert = document.getElementById('passwordalert')
			const passPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

			if(inputPass.value.match(passPattern)){
				inputPass.classList.add('is-valid');
				inputPass.classList.remove('is-invalid');
				passalert.classList.add('d-none')
			}else{
				inputPass.classList.add('is-invalid');
				inputPass.classList.remove('is-valid');
				passalert.classList.remove('d-none')
			}
		});

 inputRepass.addEventListener('input',()=>{
	let repassalert = document.getElementById('repasswordalert')			
					const repassPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;


			if(inputRepass.value.match(repassPattern )){
				inputRepass.classList.add('is-valid');
				inputRepass.classList.remove('is-invalid');
			repassalert.classList.add('d-none')
			}else{
				inputRepass.classList.add('is-invalid');
				inputRepass.classList.remove('is-valid');
				repassalert.classList.remove('d-none')
			}
		});
