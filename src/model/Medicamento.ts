   import type { MedicamentoDTO } from "../interface/MedicamentoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js"; // Importa a classe DatabaseModel

const database = new DatabaseModel().pool; // Inicializa o pool de conexões com o banco de dados

/*
* Classe Medicamento representa um modelo de Medicamento com seus atributos principais (nome, fabricante, principio_ativo e ID).
* Permite criar objetos de Medicamento, acessar e modificar seus dados, e consultar informações no banco de dados.
* Inclui métodos estáticos para listar todos os Medicamentos ou buscar um carro específico pelo ID.
*/
class Medicamento {

    // Atributos
    private id_Medicamento: number = 0;
    private nome_Medicamento: string;
    private fabricante: string;
    private principio_ativo: string;
    private data_validade: Date;
    private preco: number;

    /**
     * Construtor da classe Medicamento
     * @param _nome_Medicamento Nome do Medicamento
     * @param _fabricante fabricante do Medicamento
     * @param _principio_ativo
       @param _data_validade
       @param _preco
     */
    constructor(
        _nome_Medicamento: string,
        _fabricante: string,
        _principio_ativo: string,
        _data_validade: Date,
        _preco: number
    ) {
        this.nome_Medicamento = _nome_Medicamento;
        this.fabricante = _fabricante;
        this.principio_ativo = _principio_ativo;
        this.data_validade = _data_validade;
        this.preco = _preco;
    }

    /**
     * Retorna o ID do Medicamento
     * @returns ID do Medicamento
     */
    public getId_Medicamento(): number {
        return this.id_Medicamento;
    }

    /**
     * Atribui um ID ao Medicamento
     * @param id_Medicamento novo ID
     */
    public setId_Medicamento(id_Medicamento: number): void {
        this.id_Medicamento = id_Medicamento;
    }

    /**
     * Retorna o nome do Medicamento
     * @returns Nome do Medicamento
     */
    public getNome_Medicamento(): string {
        return this.nome_Medicamento;
    }

    /**
     * Atribui um nome ao Medicamento
     * @param nome_Medicamento novo nome do Medicamento
     */
    public setNome(nome_Medicamento: string): void {
        this.nome_Medicamento = nome_Medicamento;
    }

    /**
     * Retorna o fabricante do Medicamento
     * @returns fabricante do Medicamento
     */
    public getfabricante(): string {
        return this.fabricante;
    }

    /**
     * Atribui um fabricante ao Medicamento
     * @param fabricante novo fabricante do Medicamento
     */
    public setfabricante(fabricante: string): void {
        this.fabricante = fabricante;
    }
    

    /**
     * Retorna o principio_ativo do Medicamento
     * @returns principio_ativo do Medicamento
     */
    public getprincipio_ativo(): string {
        return this.principio_ativo;
    }

    /**
     * Atribui um principio_ativo ao Medicamento
     * @param principio_ativo novo principio_ativo do Medicamento
     */
    public setprincipio_ativo(principio_ativo: string): void {
        this.principio_ativo = principio_ativo;
    }
    


    /**
     * Retorna o principio_ativo do Medicamento
     * @returns principio_ativo do Medicamento
     */
    public getdata_validade(): Date {
        return this.data_validade;
    }

    /**
     * Atribui um principio_ativo ao Medicamento
     * @param data_validade novo principio_ativo do Medicamento
     */
    public setdata_validade(data_validade: Date): void {
        this.data_validade = this.data_validade;
    }


     /**
     * Retorna o principio_ativo do Medicamento
     * @returns principio_ativo do Medicamento
     */
    public getpreco(): number {
        return this.preco;
    }

    /**
     * Atribui um principio_ativo ao Medicamento
     * @param preco novo principio_ativo do Medicamento
     */
    public setpreco(preco: number): void {
        this.preco = preco;
    }



    /**
     * Retorna os Medicamentos cadastrados no banco de dados
     * @returns Lista com Medicamentos cadastrados
     * @returns valor nulo em caso de erro na consulta
     */
    static async listarMedicamentos(): Promise<Array<Medicamento> | null> {
        try {
            // Cria uma lista vazia que irá armazenar os objetos do tipo Medicamento
            let listaDeMedicamentos: Array<Medicamento> = [];

            // Define a consulta SQL que irá buscar todos os registros da tabela 'Medicamentos'
            const querySelectMedicamentos = `SELECT * FROM Medicamento;`;

            // Executa a consulta no banco de dados e aguarda a resposta
            const respostaBD = await database.query(querySelectMedicamentos);

            // Percorre cada linha retornada pela consulta
            respostaBD.rows.forEach((MedicamentoBD:any) => {
                // Cria um novo objeto Medicamento usando os dados da linha atual (nome, fabricante, principio_ativo)
                const novoMedicamento: Medicamento = new Medicamento(
                    MedicamentoBD.nome_Medicamento,
                    MedicamentoBD.fabricante,
                    MedicamentoBD.principio_ativo,
                    MedicamentoBD.data_validade,
                    MedicamentoBD. preco

                );

                // Define o ID do Medicamento usando o valor retornado do banco
                novoMedicamento.setId_Medicamento(MedicamentoBD.id_Medicamento);

                // Adiciona o novo Medicamento à lista de Medicamentos
                listaDeMedicamentos.push(novoMedicamento);
            });

            // Retorna a lista completa de Medicamentos
            return listaDeMedicamentos;
        } catch (error) {
            // Em caso de erro na execução da consulta, exibe uma mensagem no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna null para indicar que houve uma falha na operação
            return null;
        }
    }

    static async cadastrarMedicamento(Medicamento: MedicamentoDTO): Promise<boolean>{
        try{

            const queryInsertClient: string = `INSERT INTO Medicamento (nome_Medicamento,fabricante,data_validade,principio_ativo,preco)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING id_Medicamento;`;

            const respostaBD = await database.query(queryInsertClient,[
                Medicamento.nome_medicamento.toUpperCase(),
                Medicamento.fabricante.toUpperCase(),
                Medicamento.data_validade,
                Medicamento.principio_ativo.toUpperCase(),
                Medicamento.preco
            ]);

            if(respostaBD.rows.length > 0){
                console.info('Medicamento cadastrado com sucesso! ID: ${resposte DB.rows[0]}')
                return true;
            }
        
            return false;

        }catch(erro){
            console.log(`Erro na consulta ao banco de dados ${erro}`);
            return false
        }
    }

    static async listarMedicamento(id_Medicamento: number): Promise<Medicamento | null>{

        try{
        const querySelectMedicamentos = `SELECT * FROM Medicamento WHERE id_Medicamentos = $1;`;
        const respostaBD = await database.query(querySelectMedicamentos, [id_Medicamento]);

        if(respostaBD.rowCount != 0){
            const medicamento : Medicamento = new Medicamento(
                respostaBD.rows[0].nome_Medicamento,
                respostaBD.rows[0].fabricante,
                respostaBD.rows[0].data_validade,
                respostaBD.rows[0].principio_ativo,
                respostaBD.rows[0].preco

            );
            medicamento.setId_Medicamento(respostaBD.rows[0].id_Medicamento);

            return medicamento;

        }
        return null;

        }catch(error){
            console.log(`Erro ao buscar o Medicamento no banco de dados. ${error}`);
            return null;
        }

    }



}

export default Medicamento;