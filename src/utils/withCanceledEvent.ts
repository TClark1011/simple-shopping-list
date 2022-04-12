type BaseEvent = Pick<Event, 'preventDefault' | 'stopPropagation'> &
    Partial<Pick<Event, 'cancelBubble'>>;

const withCanceledEvent =
    <E extends BaseEvent>(callback: (e: E) => unknown) =>
    (e: E) => {
        e.preventDefault();
        e.stopPropagation();
        callback(e);
    };

export default withCanceledEvent;
