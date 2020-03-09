const PRODUTOS = '_PRODUTOS';

export function ErroValidacao(errors){
   this.errors = errors;
}


export default class ProdutoService {
    validar = (produto) => {
        const errors = [];

         if(!produto.nome){
             errors.push('O campo nome é obrigatório.');
         }
         if(!produto.sku){
            errors.push('O campo sku é obrigatório.');
        }
        if(!produto.preco || produto.preco <=0){
            errors.push('O campo preço é obrigatório e deve ser maior que zero (0).');
        }
        if(!produto.descricao){
            errors.push('O campo descricao é obrigatório.');
        }
        if(!produto.fornecedor){
            errors.push('O campo fornecedor é obrigatório.');
        }
        if(errors.length > 0){
            throw new ErroValidacao(errors);
        }
    }

    obterProdutos = () => {
        const produtos = localStorage.getItem(PRODUTOS);
        return JSON.parse(produtos);
    }
    
    salvar = (produto) =>{

        this.validar(produto);
        let produtos = localStorage.getItem(PRODUTOS);

        if(!produtos){
            produtos = [];
        }
        else{
            produtos = JSON.parse(produtos);
        }
        produtos.push(produto);
        localStorage.setItem(PRODUTOS,JSON.stringify(produtos));
    }
}