
Depois de se conectar ao banco de dados com:

```
mongodb
```


Você precisa decidir qual banco de dados deseja usar. Você não precisa criar um, o mongodb o criará para você se ele não existir.
```
use my_marvel_database
```


Agora você está pronto para:

inserir dados:
```
db.characters.insert({"real_name": "Peter Parker", nickname: "Spider-Man",
 "description": "As an orphaned child, Peter was raised by his Uncle Ben and Aunt May. At a science expo, Peter was bitten by an errant radioactive spider which granted him an array of arachnid powers."})
 ```

recuperar dados:
```
db.characters.find()
```

atualizar dados:
```
db.characters.update({"nickname": "Spider-Man"}, {$set: {"real_name": "Kaine
 Parker"}})
 ```

E remover dados:
```
db.characters.remove({"nickname": "Spider-Man"})
```
