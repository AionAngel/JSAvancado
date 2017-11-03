class View {
    
    constructor(elemento){
        this._elemento = elemento;
    }
    
    template(){
        
        throw new Error ("Voce deve criar um template para esta view");
        
    }
    
    update(model) {
        
        this._elemento.innerHTML = this.template(model);
        
        
    }
    
    
}