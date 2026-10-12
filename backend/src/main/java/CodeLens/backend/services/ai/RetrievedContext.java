package CodeLens.backend.services.ai;

import java.util.List;

import CodeLens.backend.dto.CitationDto;

public record RetrievedContext(
        List<CitationDto> citations,
        String contextText) {
}
