export default function TagButton(
    {
        mode,
        setCollapse,
        collapseIs,
        paddingTop
    }
) {

    const buttonMode = () =>

        mode === 'agregar' ? (collapseIs(mode) ? 'primary' : 'outline-primary') :
        (
            mode === 'editar' ? (collapseIs(mode) ? 'warning' : 'outline-warning') :
            collapseIs(mode) ? 'danger' : 'outline-danger'
        )

    const buttonText = () => 

        mode === 'agregar' ? 'Agregar' :
        (
            mode === 'editar' ? 'Editar' : 'Eliminar'
        )


    return (

        <div style={{ paddingTop: paddingTop }}>
            <button
                className={`btn btn-${buttonMode()}`}
                type="button"
                onClick={() => { setCollapse(mode) }}
                style={{ width: 200 }}
                data-bs-toggle="button"
                aria-pressed="false"
            >
                {buttonText()}
            </button>
        </div>
    )
}