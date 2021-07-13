interface MarkProps {
    name: string;
    keyWord: string;
}
export const Mark = ({ name, keyWord }: MarkProps) => {
    if (!keyWord) {
        return <>{name}</>;
    }
    const arr = name.split(keyWord);
    return (
        <>
            {arr.map((str, index) => {
                return (
                    <span key={index}>
                        {str}
                        {index === arr.length - 1 ? null : <span style={{ color: "#257AFD" }}>{keyWord}</span>}
                    </span>
                );
            })}
        </>
    );
};
