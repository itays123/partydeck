export function createLongText(text: string) {
  return function () {
    return (
      <>
        {text.split('\n').map((txt, i) => (
          <p key={i}>{txt}</p>
        ))}
      </>
    );
  };
}
