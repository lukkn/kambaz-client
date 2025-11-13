"use client"
export default function PassingFunctions(
    { theFunction }: { theFunction: () => void }) {
    return (
        <div>
            <h2>Passing Functions</h2>
            <button onClick={theFunction} className="btn btn-info">
                Invoke the Function
            </button>
            <hr />
        </div>
    );
}
