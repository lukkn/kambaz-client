
export default function Switch({ state, setState }: { state: boolean, setState: (s: boolean) => void }) {

    return (
        <button
            onClick={() => setState(!state)}
            className={`wd-switch ${state ? "wd-switch-on" : "wd-switch-off"}`}
            style={{
                display: "inline-block",
                position: "relative",
                width: "40px",
                height: "22px",
                backgroundColor: state ? "#0C5FAB" : "#ccc",
                border: "none",
                borderRadius: "22px",
                cursor: "pointer",
                padding: "0",
                transition: "background-color 0.3s ease",
            }}
        >
            <span
                style={{
                    position: "absolute",
                    top: "2px",
                    left: state ? "20px" : "2px",
                    width: "18px",
                    height: "18px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    transition: "left 0.3s ease",
                }}
            />
        </button>
    );
}