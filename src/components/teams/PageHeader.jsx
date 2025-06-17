
const PageHeader = ({ editMode, isEditingTeam, teamName }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-slate-100 mb-2">
        {editMode 
          ? `Editar ${isEditingTeam ? 'Equipo' : 'Borrador'}: ${teamName}` 
          : 'Crear Nuevo Equipo'
        }
      </h1>
      <p className="text-slate-400">
        {editMode 
          ? 'Modifica la composición de tu equipo/borrador'
          : 'Selecciona hasta 6 Pokémon para formar tu equipo'
        }
      </p>
    </div>
  );
};

export default PageHeader;
