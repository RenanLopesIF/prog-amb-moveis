# apt install python3-flask
# Importa o Flask
from flask import Flask

# Cria uma instância do Flask
app = Flask(__name__)

# Define a rota raiz ("/") e a função que será executada quando a rota for acessada


@app.route("/")
def homepage():
    return "<h1> Atividade 1 Programação para Amb. Móveis:</h1> <p><h2>Aluno:</h2>Renan Ferreira Lopes</p>"


# Verifica se este arquivo está sendo executado diretamente (não importado como um módulo)
if __name__ == "__main__":
    # Inicie o servidor Flask na porta 5000 com o modo de depuração ativado
    app.run(debug=True)
