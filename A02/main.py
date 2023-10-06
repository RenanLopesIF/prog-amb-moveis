# apt install python3-flask
# Importa o Flask
from flask import Flask, render_template
import sqlite3

# Conectar ao banco de dados (ou criar se não existir)
conn = sqlite3.connect('user.db')

# Cria uma instância do Flask
app = Flask(__name__)

# Define a rota da pagina de usuários e a função que será executada quando a rota for acessada


@app.route("/usuarios")
def lista_usuarios():
    global usuario1
    return render_template("./usuarios.html", usuario=usuario1[1])


# Criar um cursor
cursor = conn.cursor()

# Consultar dados
cursor.execute('SELECT * FROM Usuarios')
for row in cursor.fetchall():
    usuario1 = row

    # Verifica se este arquivo está sendo executado diretamente (não importado como um módulo)
if __name__ == "__main__":
    # Inicie o servidor Flask na porta 5000 com o modo de depuração ativado
    app.run(debug=True)
