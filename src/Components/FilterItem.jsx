export default function FilterItem(props) {
    let i = 0;

    return (
        <div >
            <label >
                <select className=" rounded-sm outline-none text-black bg-green-500 lg:m-4 m-2" onChange={(e) => props.setOptions(e.target.value)}>
                    {props.options.map((t) => <option value={t} key={t}>{t}</option>)}
                </select>
            </label>
        </div>
    )
}
