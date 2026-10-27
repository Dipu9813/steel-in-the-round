CREATE TABLE public.quote_requests (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 customer_name text NOT NULL CHECK (char_length(customer_name) BETWEEN 1 AND 100),
 phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 25),
 email text NOT NULL DEFAULT '' CHECK (char_length(email) <= 254),
 items jsonb NOT NULL CHECK (jsonb_typeof(items) = 'array' AND jsonb_array_length(items) BETWEEN 1 AND 7),
 delivery_method text NOT NULL CHECK (delivery_method IN ('delivery','pickup')),
 district text NOT NULL DEFAULT '' CHECK (char_length(district) <= 100),
 municipality text NOT NULL DEFAULT '' CHECK (char_length(municipality) <= 100),
 address text NOT NULL DEFAULT '' CHECK (char_length(address) <= 500),
 notes text NOT NULL DEFAULT '' CHECK (char_length(notes) <= 1500),
 status text NOT NULL DEFAULT 'new' CHECK (status = 'new'),
 CHECK (delivery_method = 'pickup' OR (char_length(district) > 0 AND char_length(municipality) > 0 AND char_length(address) > 0))
);
GRANT INSERT ON public.quote_requests TO anon, authenticated;
GRANT ALL ON public.quote_requests TO service_role;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can submit new quote requests" ON public.quote_requests FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');
CREATE FUNCTION public.validate_quote_items() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE item jsonb; seen text[] := '{}';
BEGIN
 FOR item IN SELECT value FROM jsonb_array_elements(NEW.items) LOOP
  IF jsonb_typeof(item) <> 'object' OR item->>'product' IS NULL OR item->>'product' NOT IN ('almirah','wardrobe','bed','chair','desk','bench','trunk') OR jsonb_typeof(item->'quantity') IS DISTINCT FROM 'number' OR (item->>'quantity')::numeric < 1 OR (item->>'quantity')::numeric > 999 OR (item->>'quantity')::numeric <> trunc((item->>'quantity')::numeric) OR (item->>'product') = ANY(seen) THEN RAISE EXCEPTION 'Invalid furniture quote items'; END IF;
  seen := array_append(seen, item->>'product');
 END LOOP;
 RETURN NEW;
END; $$;
CREATE TRIGGER validate_quote_items_before_insert BEFORE INSERT ON public.quote_requests FOR EACH ROW EXECUTE FUNCTION public.validate_quote_items();