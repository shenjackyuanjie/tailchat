import clsx from 'clsx';
import React from 'react';

export const RoleItem: React.FC<{
  active: boolean;
  onClick?: () => void;
}> = React.memo((props) => {
  return (
    <div
      className={clsx(
        'px-2 py-1 rounded cursor-pointer mb-1 hover:bg-black hover:bg-opacity-20',
        {
          'bg-black bg-opacity-20': props.active,
        }
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
});
RoleItem.displayName = 'RoleItem';
