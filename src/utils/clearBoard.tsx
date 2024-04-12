export function clearBoard(
  gameFieldContainerFieldRef: any,
  winLineRef: any,
  field: any
) {
  gameFieldContainerFieldRef.current?.classList.remove("field--won");
  gameFieldContainerFieldRef.current?.classList.remove("field--lose");
  gameFieldContainerFieldRef.current?.classList.remove("field--draw");
  gameFieldContainerFieldRef.current?.classList.remove("field--disabled");
  gameFieldContainerFieldRef.current?.classList.remove("field--active");

  for (let i = 0; i < field.length; i++) {
    const fieldEl = gameFieldContainerFieldRef.current?.querySelector(
      `[data-field-id="${i + 1}"]`
    );
    if (fieldEl) {
      fieldEl.innerHTML = "";
      fieldEl.classList.remove("field-el--disabled");
    }
  }
  winLineRef.current!.style.display = "none";
}
