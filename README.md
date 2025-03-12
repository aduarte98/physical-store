# 🏪 Physical Store API

API para encontrar lojas próximas com base no CEP informado. Utiliza os serviços **ViaCEP** e **Nominatim** para obter endereços e coordenadas geográficas, além de calcular a distância entre o usuário e as lojas cadastradas.

## 🚀 Tecnologias Utilizadas

- **Node.js** com **Express**
- **MongoDB** com **Mongoose**
- **Axios** para requisições HTTP
- **Nominatim** (OpenStreetMap) para geocodificação
- **ViaCEP** para busca de endereços via CEP
- **dotenv** - Gerenciamento de variáveis de ambiente  
- **winston** - Logger para registro de logs  

## 📌 Funcionalidades

✅ Buscar lojas próximas ao usuário com base no CEP  
✅ Utilizar o **ViaCEP** para obter o endereço  
✅ Obter **latitude e longitude** do endereço via **Nominatim**  
✅ Calcular a **distância** entre o usuário e as lojas  
✅ Listar apenas lojas dentro de um **raio de 100 km**
