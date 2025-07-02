import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListProduto () {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();


    useEffect(() => {

        carregarLista();

   }, [])

   function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

   function carregarLista() {

        axios.get("http://localhost:8080/api/produto")
        .then((response) => {
           setLista(response.data)
        })
    }

   function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/produto/' + idRemover)
        .then((response) => {
  
            console.log('produto removido com sucesso.')
  
            axios.get("http://localhost:8080/api/produto")
            .then((response) => {
                setLista(response.data)
            })
        })
        .catch((error) => {
            console.log('Erro ao remover um produto.')
        })

        setOpenModal(false)
    }

return(
    <div>
        <MenuSistema tela={'produto'} />
        <div style={{marginTop: '3%'}}>
            <Container textAlign='justified' >
                <h2> Produto </h2>
                <Divider />
                <div style={{marginTop: '4%'}}>
                    <Button
                        label='Novo'
                        circular
                        color='orange'
                        icon='clipboard outline'
                        floated='right'
                        as={Link}
                        to='/form-produto'
                    />

                    <br/><br/><br/>
                  
                <Table color='orange' sortable celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Código</Table.HeaderCell>
                            <Table.HeaderCell>Categoria</Table.HeaderCell>
                            <Table.HeaderCell>Título</Table.HeaderCell>
                            <Table.HeaderCell>Descrição</Table.HeaderCell>
                            <Table.HeaderCell>Valor Unitário</Table.HeaderCell>
                            <Table.HeaderCell>Tempo Mínimo de Entrega</Table.HeaderCell>
                            <Table.HeaderCell>Tempo Máximo de Entrega</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>     
                    <Table.Body>
                        { lista.map(p => (
                        <Table.Row key={p.id}>
                            <Table.Cell>{p.codigo}</Table.Cell>
                                <Table.Cell>{p.categoria.descricao}</Table.Cell>
                                <Table.Cell>{p.titulo}</Table.Cell>
                                <Table.Cell>{p.descricao}</Table.Cell>
                                <Table.Cell>{p.valorUnitario}</Table.Cell>
                                <Table.Cell>{p.tempoEntregaMinimo}</Table.Cell>
                                <Table.Cell>{p.tempoEntregaMaximo}</Table.Cell>
                                <Table.Cell textAlign='center'>
                            </Table.Cell>
                        </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </Container>
    </div>

            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

        </div>
    )
}
