function getAge(DOB) {
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
}
document.getElementById('next').onclick=function() {
    let currAge=getAge(document.getElementById('dob').value);
    let output = document.getElementById('remark');
    output.innerText="";
    if(currAge<13) {
        let error=document.createElement('h3');
        error.setAttribute('class','error');
        error.innerText="You are below 13 years of age!!";
        output.appendChild(error);
    }
    else {
        let error=document.createElement('h3');
        error.setAttribute('class','ok');
        error.innerText="Welcome to Facebook Account!!";
        output.appendChild(error);
    }
}    