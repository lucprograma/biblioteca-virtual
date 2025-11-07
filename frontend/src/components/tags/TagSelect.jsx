export default function TagSelect(
    {
        findTagName,
        editFlag,
        setEditFlag,
        collapseIs,
        tags
    }
) {


    return (

        <div className="col-auto">

            <label htmlFor="selectTag" style={{paddingBottom: 10, fontSize: 18}}>
                <strong>
                    Seleccione una etiqueta:
                </strong>
            </label>
            
            <select
                className="form-select"
                multiple
                style={{width: 300, height: 400}}
                id="selectTag"
                name="id"
                onChange={(e) => {
                    findTagName(e.target.value);
                    editFlag === true ? setEditFlag(false) : null
                }}
                disabled={collapseIs('agregar')}
                data-bs-theme="dark"
            >
                {
                    tags.map((tag) => (

                        <option
                            key={tag.tag_id}
                            value={tag.tag_id}
                            style={{borderBottom: '1px solid gray'}}
                        >
                            {tag.name}
                        </option>
                    ))
                }
            </select>

        </div>
    )
}