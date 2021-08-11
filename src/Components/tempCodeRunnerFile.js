{tickets.map((ticket) => (
                    <Ticket
                        key={ticket.id}
                        id={ticket.id}
                        salesperson={ticket.salesperson}
                        year={ticket.year}
                        model={ticket.model}
                        body={ticket.body}
                        pep={ticket.pep}
                        ext={ticket.ext}
                        int={ticket.int}
                        options={ticket.options}
                        notes={ticket.notes}
                        isActive={ticket.isActive}
                        setTickets={setTickets}
                    />
                ))}