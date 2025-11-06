   import type { ClienteDTO } from "../interface/ClienteDTO.js";
import { DatabaseModel } from "./DatabaseModel.js"; // Importa a classe DatabaseModel

const database = new DatabaseModel().pool; // Inicializa o pool de conexões com o banco de dados

/*
* Classe Cliente representa um modelo de cliente com seus atributos principais (nome, cpf, telefone e ID).
* Permite criar objetos de cliente, acessar e modificar seus dados, e consultar informações no banco de dados.
* Inclui métodos estáticos para listar todos os clientes ou buscar um carro específico pelo ID.
*/
class Cliente {

    // Atributos
    private idCliente: number = 0;
    private nome_cliente: string;
    private cpf: string;
    private telefone: string;
    private data_nacimento: Date;
    private email: string;

    /**
     * Construtor da classe Cliente
     * @param _nome_cliente Nome do cliente
     * @param _cpf CPF do cliente
     * @param _telefone
       @param _data_nacimento
       @param _email
     */
    constructor(
        _nome_cliente: string,
        _cpf: string,
        _telefone: string,
        _data_nacimento: Date,
        _email: string
    ) {
        this.nome_cliente = _nome_cliente;
        this.cpf = _cpf;
        this.telefone = _telefone;
        this.data_nacimento = _data_nacimento;
        this.email = _email;
    }

    /**
     * Retorna o ID do cliente
     * @returns ID do cliente
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Atribui um ID ao cliente
     * @param idCliente novo ID
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    /**
     * Retorna o nome do cliente
     * @returns Nome do cliente
     */
    public getNome_cliente(): string {
        return this.nome_cliente;
    }

    /**
     * Atribui um nome ao cliente
     * @param nome_cliente novo nome do cliente
     */
    public setNome(nome_cliente: string): void {
        this.nome_cliente = nome_cliente;
    }

    /**
     * Retorna o CPF do cliente
     * @returns CPF do cliente
     */
    public getCpf(): string {
        return this.cpf;
    }

    /**
     * Atribui um CPF ao cliente
     * @param cpf novo CPF do cliente
     */
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }
    

    /**
     * Retorna o telefone do cliente
     * @returns Telefone do cliente
     */
    public getTelefone(): string {
        return this.telefone;
    }

    /**
     * Atribui um telefone ao cliente
     * @param telefone novo telefone do cliente
     */
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }
    


    /**
     * Retorna o telefone do cliente
     * @returns Telefone do cliente
     */
    public getData_nacimento(): Date {
        return this.data_nacimento;
    }

    /**
     * Atribui um telefone ao cliente
     * @param data_nacimento novo telefone do cliente
     */
    public setData_nacimento(data_nacimento: Date): void {
        this.data_nacimento = this.data_nacimento;
    }


     /**
     * Retorna o telefone do cliente
     * @returns Telefone do cliente
     */
    public getEmail(): string {
        return this.telefone;
    }

    /**
     * Atribui um telefone ao cliente
     * @param email novo telefone do cliente
     */
    public setEmail(email: string): void {
        this.email = email;
    }



    /**
     * Retorna os clientes cadastrados no banco de dados
     * @returns Lista com clientes cadastrados
     * @returns valor nulo em caso de erro na consulta
     */
    static async listarClientes(): Promise<Array<Cliente> | null> {
        try {
            // Cria uma lista vazia que irá armazenar os objetos do tipo Cliente
            let listaDeClientes: Array<Cliente> = [];

            // Define a consulta SQL que irá buscar todos os registros da tabela 'clientes'
            const querySelectClientes = `SELECT * FROM cliente;`;

            // Executa a consulta no banco de dados e aguarda a resposta
            const respostaBD = await database.query(querySelectClientes);

            // Percorre cada linha retornada pela consulta
            respostaBD.rows.forEach((clienteBD:any) => {
                // Cria um novo objeto Cliente usando os dados da linha atual (nome, cpf, telefone)
                const novoCliente: Cliente = new Cliente(
                    clienteBD.nome_cliente,
                    clienteBD.cpf,
                    clienteBD.telefone,
                    clienteBD.data_nacimento,
                    clienteBD. email

                );

                // Define o ID do cliente usando o valor retornado do banco
                novoCliente.setIdCliente(clienteBD.id_cliente);

                // Adiciona o novo cliente à lista de clientes
                listaDeClientes.push(novoCliente);
            });

            // Retorna a lista completa de clientes
            return listaDeClientes;
        } catch (error) {
            // Em caso de erro na execução da consulta, exibe uma mensagem no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna null para indicar que houve uma falha na operação
            return null;
        }
    }

    static async cadastrarCliente(cliente: ClienteDTO): Promise<boolean>{
        try{

            const queryInsertClient: string = `INSERT INTO cliente (nome_cliente,cpf,data_nacimento,telefone,email)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING id_cliente;`;

            const respostaBD = await database.query(queryInsertClient,[
                cliente.nome_cliente.toUpperCase(),
                cliente.cpf,
                cliente.data_nacimento,
                cliente.telefone,
                cliente.email.toUpperCase()
            ]);

            if(respostaBD.rows.length > 0){
                console.info('Cliente cadastrado com sucesso! ID: ${resposte DB.rows[0]}')
                return true;
            }
        
            return false;

        }catch(erro){
            console.log(`Erro na consulta ao banco de dados ${erro}`);
            return false
        }
    }

static async listarCliente(id_cliente: number): Promise<Cliente | null>{

        try{
        const querySelectClientes = `SELECT * FROM cliente WHERE id_clientes = $1;`;
        const respostaBD = await database.query(querySelectClientes, [id_cliente]);

        if(respostaBD.rowCount != 0){
            const cliente : Cliente = new Cliente(
                respostaBD.rows[0].nome_cliente,
                respostaBD.rows[0].cpf,
                respostaBD.rows[0].telefone,
                respostaBD.rows[0].data_nacimento,
                respostaBD.rows[0].email

            );
            cliente.setIdCliente(respostaBD.rows[0].id_cliente);

            return cliente;

        }
        return null;

        }catch(error){
            console.log(`Erro ao buscar o cliente no banco de dados. ${error}`);
            return null;
        }

    }

    



}

export default Cliente;