import React from 'react';
import ProdutoService from '../../App/produtoService';
import {withRouter} from 'react-router-dom';

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    fornecedor: '',
    preco: 0,
    sucesso: false,
    errors: [],
    atualiazando: false
}
class CadastroProduto extends React.Component {

    state = estadoInicial;

    constructor() {
        super()
        this.service = new ProdutoService();
    }

    onChange = (event) => {
        const valor = event.target.value;
        const nomeCampo = event.target.name;
        this.setState({ [nomeCampo]: valor });
    }

    onSubmit = (event) => {
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            fornecedor: this.state.fornecedor,
            preco: this.state.preco
        }

        try {
            this.service.salvar(produto);
            this.LimparCampos();
            this.setState({ sucesso: true });
        }
        catch (erro) {
            const errors = erro.errors;
            this.setState({errors: errors});
        }

    }

    LimparCampos = () => {
        this.setState(estadoInicial);
    }

     componentDidMount(){
          const sku = this.props.match.params.sku;

          if(sku){
            const resultado = this.service.obterProdutos().filter(produto => produto.sku === sku);
            if(resultado.length === 1){
               const produtoEncontrado = resultado[0]
               this.setState({...produtoEncontrado, atualiazando: true});
            }
          }
     }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                {
                    this.state.atualiazando ? 'Atualização ' : 'Cadastro '
                }
                de Produtos
                 </div>
                <div className="card-body">

                    {this.state.sucesso &&
                        <div className="alert alert-dismissible alert-success" >
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>Muito bem!</strong> Cadastrado realizado com sucesso!
                        </div>
                    }

                    {this.state.errors.length > 0 &&

                        this.state.errors.map(msg => {
                            return (
                                <div className="alert alert-dismissible alert-danger" >
                                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                                    <strong>Ops!</strong> Algo não está legal...
                                     {msg}
                                </div>
                            )
                        })
                    }

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input type="text" className="form-control" value={this.state.nome} name="nome" onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>SKU: *</label>
                                <input type="text" className="form-control" value={this.state.sku} name="sku" onChange={this.onChange} disabled={this.state.atualiazando} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Descrição: *</label>
                                <textarea className="form-control" value={this.state.descricao} name="descricao" onChange={this.onChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Preço: *</label>
                                <input type="text" className="form-control" value={this.state.preco} name="preco" onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fornecedor: *</label>
                                <input type="text" className="form-control" value={this.state.fornecedor} name="fornecedor" onChange={this.onChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <button className="btn btn-success" onClick={this.onSubmit}>
                                {
                                    this.state.atualiazando ? 'Atualizar' : 'Cadastrar'
                                }
                                </button>
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-primary" onClick={this.LimparCampos} >Limpar</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(CadastroProduto)