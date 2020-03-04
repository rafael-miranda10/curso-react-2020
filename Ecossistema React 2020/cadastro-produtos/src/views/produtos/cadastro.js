import React from 'react';

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    fornecedor: '',
    preco: 0
}
export default class CadastroProduto extends React.Component {
    state = estadoInicial;

    onChange = (event) => {
        const valor = event.target.value;
        const nomeCampo = event.target.name;
        this.setState({ [nomeCampo]: valor });
    }

    onSubmit = (event) => {
        console.log(this.state);
    }

    LimparCampos = () => {
        this.setState(estadoInicial);
    }


    render() {
        return (
            <div className="card">
                <div className="card-header">Cadastro de Produtos</div>
                <div className="card-body">

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input type="text"
                                    name="nome"
                                    value={this.state.nome}
                                    className="form-control"
                                    onChange={this.onChange}>
                                </input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>SKU: *</label>
                                <input type="text"
                                    name="sku"
                                    value={this.state.sku}
                                    className="form-control"
                                    onChange={this.onChange}>
                                </input>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Descrição: *</label>
                                <textarea name="descricao"
                                    value={this.state.descrição}
                                    className="form-control"
                                    onChange={this.onChange}>
                                </textarea>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Preço: *</label>
                                <input type="text"
                                    name="preco"
                                    value={this.state.preco}
                                    className="form-control"
                                    onChange={this.onChange}>
                                </input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fornecedor: *</label>
                                <input type="text"
                                    name="fornecedor"
                                    value={this.state.fornecedor}
                                    className="form-control"
                                    onChange={this.onChange}>
                                </input>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-1">
                            <button className="btn btn-success" onClick={this.onSubmit}> Salvar</button>
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-primary" onClick={this.LimparCampos} > Limpar</button>
                        </div>
                    </div>



                </div>
            </div>
        )
    }
}

