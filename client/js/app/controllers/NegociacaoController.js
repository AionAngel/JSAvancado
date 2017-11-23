
class NegociacaoController {
    
    constructor(){
        
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), 
            this._negociacoesView,
            'adiciona', 'apaga');
            


        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(new Mensagem(), 
            this._mensagemView,
            'texto');

        
        this._negociacoesView.update(this._listaNegociacoes);
        this._mensagemView.update(this._mensagem);
        
    }
    
    adiciona(event){
        
        event.preventDefault();
            
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Mensagem adicionada com sucesso';
        this._limpaFormulario();
        
        //console.log(this._listaNegociacoes.negociacoes);
        
    }
    
    _criaNegociacao() {
        
        return new Negociacao(DateHelper.textoParaData(this._inputData.value),
                this._inputQuantidade.value,
                this._inputValor.value);
        
    }
    
    _limpaFormulario() {
        
        this._inputData.value = '';
        this._inputQuantidade.value = 1.0;
        this._inputValor.value = 0.0;
        
        this._inputData.focus();
        
    }
    
    apaga() {

        this._listaNegociacoes.apaga();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    
    }

    importaNegociacoes() {
        
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {

                    JSON.parse(xhr.responseText)
                    .map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                    this._mensagem.texto = 'Negociações importadas com sucesso.';

                } else {
                    console.log(xhr.responseText);
                    this._mensagem.texto = 'Não foi possível obter as negociações.';
                }
            }
        }
        xhr.send();

    }
    
}