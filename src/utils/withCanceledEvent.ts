type BaseEvent = Pick<Event, 'preventDefault' | 'stopPropagation'>;

const withCanceledEvent =
    <E extends BaseEvent>(callback: (e: E) => unknown) =>
    (e: E) => {
        e.preventDefault();
        e.stopPropagation();
        callback(e);
    };

export default withCanceledEvent;
