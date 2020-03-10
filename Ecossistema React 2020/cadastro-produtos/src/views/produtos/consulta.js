import React from 'react';
import ProdutoService from '../../App/produtoService';
import { withRouter } from 'react-router-dom';

class ConsultaProdutos extends React.Component {

    state = {
        produtos: []
    }

    constructor() {
        super()
        this.service = new ProdutoService();
    }

    componentDidMount() {
        const produtos = this.service.obterProdutos();
        this.setState({ produtos });
    }

    preparaEditar = (sku) => {
        console.log(sku);
        this.props.history.push(`/cadastro-produtos/${sku}`);
    }

    deletar = (sku) => {
      const produtos = this.service.deletar(sku);
      this.setState({produtos:produtos});
    }

    render() {
        return (

            <div className="card">
                <div className="card-header">Consulta de Produtos</div>
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>SKU</th>
                                <th>Fornecedor</th>
                                <th>Preço</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.produtos.map((produto, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{produto.nome}</th>
                                            <th>{produto.sku}</th>
                                            <th>{produto.fornecedor}</th>
                                            <th>{produto.preco}</th>
                                            <th>
                                                <button onClick={() => this.preparaEditar(produto.sku)} className="btn btn-primary">Editar</button>
                                                <button onClick={() => this.deletar(produto.sku)} className="btn btn-danger">Excluir</button>
                                            </th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(ConsultaProdutos)