function toggleSidebar(){
    let sidebar =
    document.querySelector(".sidebar");
      if(sidebar.style.display === "none"){
        sidebar.style.display = "block";
      }else{
        sidebar.style.display = "none";
      }
      
}


const btn =
document.getElementById('theme-btn');
btn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});