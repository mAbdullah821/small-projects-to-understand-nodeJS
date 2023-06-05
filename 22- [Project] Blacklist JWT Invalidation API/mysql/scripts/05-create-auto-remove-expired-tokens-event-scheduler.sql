USE nodeAppDB

delimiter |

create event if not exists auto_remove_expired_tokens
  on schedule every 1 day
  do
    begin
      delete from blacklist where tokenExp <= unix_timestamp();
    end |

delimiter ;