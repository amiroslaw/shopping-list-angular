package ovh.miroslaw.shoppinglist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ovh.miroslaw.shoppinglist.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
