class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True)
    title = Column(String(200))
    event_date = Column(Date)
    event_type = Column(String(50))
    description = Column(Text)
    created_by = Column(String(100))