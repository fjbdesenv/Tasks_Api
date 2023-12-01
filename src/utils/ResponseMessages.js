const NotFound = (res) => res.status(404).json({message: "Registro não foi encontrado."});
const NotCreate = (res) => res.status(404).json({message: "Registro não foi cadastrado."});
const Deleted = (res) => res.json({message: "Registro deletado."})


const ResponseMessages = { 
    NotFound, 
    NotCreate, 
    Deleted
};


export { ResponseMessages };