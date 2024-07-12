import React from 'react';

export default function Checkbox({title, id, name}) {
  return(
    <div class="form_checkbox">
      <input type="checkbox" id={id} name={name} />
      <label for={id}>{title}</label>
    </div>
  );
}