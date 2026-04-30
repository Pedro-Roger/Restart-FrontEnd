#!/usr/bin/env python3
import json
import os
import re
import subprocess
import sys
from pathlib import Path


PROJECT_ID = "7721913470452622854"
MCP_URL = "https://stitch.googleapis.com/mcp"

SCREENS = [
    ("Evolução RA (Gamificada)", "fb802ec0c4834d94b7acd9caa06eb8ea"),
    ("Jornada Financeira (Gamificada)", "b3acc63a2ddc4638bb1c67c00c5a1a05"),
    ("Dashboard Principal (Gamificado)", "20a3bdca92ce48f8b75b8f2095191431"),
    ("Dashboard Principal", "5e3d18dd59c14646a44b1967fdf724bc"),
    ("Onboarding 1", "da3d6d69a3f74c26bdd3aaa726b64d07"),
    ("Onboarding 2", "76e2335291c54af2b566fea44f3f6bfe"),
    ("Onboarding 3", "8dfb627d9a5f4fb8b627bcfb8e4d032c"),
    ("Login", "022a539f2b7043feaa1e21ce065a7fb0"),
    ("Cadastro", "371fdd92a571487e8b400e6dac80a9e5"),
    ("Conexão com Banco", "b25cb4ee9c6341c1869b3b5ad9b09f00"),
    ("Jornada Financeira", "a3a9b2ae412c4e38b664848a3778f187"),
    ("Pagamentos", "6e94b0e893484959846b40312fcd7f38"),
    ("Educação Financeira", "51ec590a89954138bbb5f89868dfe475"),
    ("Evolução Detalhada", "0052300fd92241cf90015c916d3810c4"),
    ("Splash Screen", "caf3d969ca5748328339fa860ba3c079"),
    ("Perfil do Usuário", "bd4667e08f5043e5bc0e89c2566e4a65"),
]


def slugify(value: str) -> str:
    normalized = value.lower()
    replacements = {
        "ç": "c",
        "ã": "a",
        "á": "a",
        "é": "e",
        "í": "i",
        "ó": "o",
        "ú": "u",
    }
    for source, target in replacements.items():
        normalized = normalized.replace(source, target)
    normalized = re.sub(r"[^a-z0-9]+", "-", normalized).strip("-")
    return normalized


def run_curl(args: list[str]) -> bytes:
    result = subprocess.run(["curl", "-sS", "-L", *args], check=True, stdout=subprocess.PIPE)
    return result.stdout


def call_tool(api_key: str, screen_id: str) -> dict:
    payload = {
        "jsonrpc": "2.0",
        "id": screen_id,
        "method": "tools/call",
        "params": {
            "name": "get_screen",
            "arguments": {
                "name": f"projects/{PROJECT_ID}/screens/{screen_id}",
                "projectId": PROJECT_ID,
                "screenId": screen_id,
            },
        },
    }
    response = run_curl(
        [
            "-X",
            "POST",
            MCP_URL,
            "-H",
            "Content-Type: application/json",
            "-H",
            f"X-Goog-Api-Key: {api_key}",
            "-H",
            "Accept: application/json, text/event-stream",
            "--data",
            json.dumps(payload),
        ]
    )
    data = json.loads(response)
    if "error" in data:
        raise RuntimeError(f"{screen_id}: {data['error']}")
    return data["result"]["structuredContent"]


def download(url: str, output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    run_curl([url, "-o", str(output)])


def main() -> int:
    api_key = os.environ.get("STITCH_API_KEY")
    if not api_key:
        print("STITCH_API_KEY is required", file=sys.stderr)
        return 2

    assets_dir = Path("assets/stitch/screens")
    code_dir = Path("stitch-code")
    manifest = []

    for index, (title, screen_id) in enumerate(SCREENS, start=1):
        slug = slugify(title)
        print(f"[{index:02d}/{len(SCREENS)}] {title}")
        screen = call_tool(api_key, screen_id)
        image_path = assets_dir / f"{index:02d}-{slug}.png"
        html_path = code_dir / f"{index:02d}-{slug}.html"
        download(screen["screenshot"]["downloadUrl"], image_path)
        download(screen["htmlCode"]["downloadUrl"], html_path)
        manifest.append(
            {
                "index": index,
                "title": title,
                "id": screen_id,
                "slug": slug,
                "width": int(screen["width"]),
                "height": int(screen["height"]),
                "image": str(image_path),
                "html": str(html_path),
            }
        )

    Path("stitch-code/manifest.json").write_text(
        json.dumps({"projectId": PROJECT_ID, "screens": manifest}, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print("Done")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
