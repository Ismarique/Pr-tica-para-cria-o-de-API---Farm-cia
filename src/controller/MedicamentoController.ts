import type { MedicamentoDTO } from "../interface/MedicamentoDTO.js";
import Medicamento from "../model/Medicamento.js";
import type { Request, Response } from "express";

/**
 * Classe responsável por receber a requisição do Medicamento, processar essa requisição e devolver a resposta ao Medicamento
 * 
 * Trata apenas de requisições relacionadas ao recurso Medicamento
 */
class MedicamentoController extends Medicamento {

    /**
     * Faz a chamada ao modelo para obter a lista de Medicamentos e devolve ao Medicamento
     * 
     * @param req Requisição do Medicamento
     * @param res Resposta do servidor
     * @returns (200) Lista de todos os Medicamentos
     * @returns (500) Erro na consulta
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarMedicamentos da classe Medicamento para buscar todos os Medicamentos no banco de dados
            const listaMedicamentos: Array<Medicamento> | null = await Medicamento.listarMedicamentos();

            // Retorna uma resposta HTTP com status 200 (OK) e envia a lista de Medicamentos em formato JSON
            return res.status(200).json(listaMedicamentos);
        } catch (error) {
            // Em caso de erro, exibe a mensagem no console para ajudar na depuração
            console.error(`Erro ao consultar modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (erro interno do servidor)
            // Envia uma mensagem informando que não foi possível acessar os dados
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de Medicamentos." });
        }
    }

    /**
     * Faz a chamada ao modelo para inserir um novo Medicamento
     * @param req Requisição do Medicamento
     * @param res Resposta do servidor
     * @returns (200) Objeto do Medicamento inserido
     * @returns (400) Erro ao inserir Medicamento
     * @returns (500) Erro na consulta
     */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // Extrai os dados enviados pelo Medicamento na requisição HTTP (normalmente via POST)
            // Esses dados devem estar no corpo da requisição e seguir o formato da interface CarroDTO
            const dadosRecebidosMedicamento = req.body;

            // validação de dados ...

            // Chama o método cadastrarCarro da classe Carro, passando os dados recebidos
            // Esse método deve inserir o carro no banco de dados e retornar true ou false
            const respostaModelo = await Medicamento.cadastrarMedicamento(dadosRecebidosMedicamento);

            // Verifica se o cadastro foi bem-sucedido
            if (respostaModelo) {
                // Se sim, retorna uma resposta HTTP com status 201 (Created)
                // Envia uma mensagem informando que o carro foi cadastrado com sucesso
                return res.status(201).json({ mensagem: "Medicamento cadastrado com sucesso." });
            } else {
                // Se não, retorna uma resposta HTTP com status 400 (Bad Request)
                // Envia uma mensagem informando que houve erro no cadastro
                return res.status(400).json({ mensagem: "Erro ao cadastrar Medicamento." });
            }
        } catch (error) {
            // Em caso de erro inesperado (como falha de conexão ou erro interno), exibe a mensagem no console
            console.error(`Erro no modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (Internal Server Error)
            // Envia uma mensagem informando que não foi possível inserir o novo carro
            return res.status(500).json({ mensagem: "Não foi possível inserir o Medicamento" });
        }
        }

    static async medicamento(req: Request, res: Response): Promise<Response>{
        try{
            const idMedicamento: number = parseInt (req.params.idMedicamento as string);

            //validação simples
            if (isNaN(idMedicamento) || idMedicamento <= 0){
                return res.status(400).json({mensagem: "ID inválido."});            
            } 

            const respostaModelo = await Medicamento.listarMedicamento(idMedicamento);

              if (respostaModelo === null) {
                return res.status(200).json({ mensagem: "Nenhum medicamento encontrado com o ID fornecido." });
            }
            return res.status(400).json(respostaModelo);
        }catch(error){
            console.error(`Erro ao acesso o modelo. ${error}`);
            return res.status(500).json({mensagem: "Não foi possivel recuperar o medicamento."});
        }
    }
    }


export default MedicamentoController;